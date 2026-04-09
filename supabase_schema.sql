-- SQL Schema for Inkroot missing tables
-- Run this in your Supabase SQL Editor

-- 1. Create likes table
CREATE TABLE IF NOT EXISTS public.likes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    work_id UUID NOT NULL REFERENCES public.works(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(work_id, user_id)
);

-- Enable RLS for likes
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;

-- Create policies for likes
CREATE OR REPLACE POLICY "Public likes are viewable by everyone" ON public.likes
    FOR SELECT USING (true);

CREATE OR REPLACE POLICY "Authenticated users can toggle likes" ON public.likes
    FOR ALL USING (auth.uid() = user_id);

-- 2. Create comments table
CREATE TABLE IF NOT EXISTS public.comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    work_id UUID NOT NULL REFERENCES public.works(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    status TEXT DEFAULT 'active', -- 'active', 'blocked'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for comments
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- Create policies for comments
CREATE OR REPLACE POLICY "Public comments are viewable by everyone" ON public.comments
    FOR SELECT USING (true);

CREATE OR REPLACE POLICY "Authenticated users can manage their own comments" ON public.comments
    FOR ALL USING (auth.uid() = user_id);

-- 3. Create notifications table (if missing)
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    content TEXT NOT NULL,
    link TEXT,
    read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for notifications
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Create policies for notifications
CREATE OR REPLACE POLICY "Users can only see their own notifications" ON public.notifications
    FOR SELECT USING (auth.uid() = user_id);

CREATE OR REPLACE POLICY "System can create notifications" ON public.notifications
    FOR INSERT WITH CHECK (true);

CREATE OR REPLACE POLICY "Users can update their own notifications" ON public.notifications
    FOR UPDATE USING (auth.uid() = user_id);

-- 4. Create follows table
CREATE TABLE IF NOT EXISTS public.follows (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE, -- The follower
    following_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE, -- The person being followed
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, following_id)
);

-- Enable RLS for follows
ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;

-- Create policies for follows
CREATE OR REPLACE POLICY "Public follows are viewable by everyone" ON public.follows
    FOR SELECT USING (true);

CREATE OR REPLACE POLICY "Authenticated users can toggle follows" ON public.follows
    FOR ALL USING (auth.uid() = user_id);

-- 5. Update users table (run this if users table exists)
-- ALTER TABLE public.users ADD COLUMN IF NOT EXISTS is_banned BOOLEAN DEFAULT false;
-- ALTER TABLE public.users ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user';
-- ALTER TABLE public.users ADD COLUMN IF NOT EXISTS city TEXT;
-- ALTER TABLE public.users ADD COLUMN IF NOT EXISTS bio TEXT;
-- ALTER TABLE public.users ADD COLUMN IF NOT EXISTS tip_url TEXT;
-- ALTER TABLE public.users ADD COLUMN IF NOT EXISTS ball_points INTEGER DEFAULT 0;
-- ALTER TABLE public.users ADD COLUMN IF NOT EXISTS lighthouse_points INTEGER DEFAULT 0;
-- ALTER TABLE public.users ADD COLUMN IF NOT EXISTS quills INTEGER DEFAULT 0;
-- ALTER TABLE public.users ADD COLUMN IF NOT EXISTS ink_pens INTEGER DEFAULT 0;
-- ALTER TABLE public.users ADD COLUMN IF NOT EXISTS last_active_at TIMESTAMP WITH TIME ZONE;

-- 6. Add purchase_url, cover_url, is_boosted, and boosted_at to works
-- ALTER TABLE public.works ADD COLUMN IF NOT EXISTS purchase_url TEXT;
-- ALTER TABLE public.works ADD COLUMN IF NOT EXISTS cover_url TEXT;
-- ALTER TABLE public.works ADD COLUMN IF NOT EXISTS is_boosted BOOLEAN DEFAULT false;
-- ALTER TABLE public.works ADD COLUMN IF NOT EXISTS boosted_at TIMESTAMP WITH TIME ZONE;
-- ALTER TABLE public.works ADD COLUMN IF NOT EXISTS paper_texture TEXT DEFAULT 'default';
-- ALTER TABLE public.works ADD COLUMN IF NOT EXISTS custom_font TEXT DEFAULT 'default';
-- ALTER TABLE public.works ADD COLUMN IF NOT EXISTS hero_until TIMESTAMP WITH TIME ZONE;
-- ALTER TABLE public.works ADD COLUMN IF NOT EXISTS read_next_until TIMESTAMP WITH TIME ZONE;
-- ALTER TABLE public.works ADD COLUMN IF NOT EXISTS cta_link TEXT;
-- ALTER TABLE public.works ADD COLUMN IF NOT EXISTS cta_text TEXT;

-- 7. Support Tickets and Messages
CREATE TABLE IF NOT EXISTS public.support_tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'pending', -- 'pending', 'resolved'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id)
);

ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE POLICY "Users can manage their own tickets" ON public.support_tickets
    FOR ALL USING (auth.uid() = user_id);

CREATE OR REPLACE POLICY "Admins can manage all tickets" ON public.support_tickets
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE TABLE IF NOT EXISTS public.support_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_id UUID NOT NULL REFERENCES public.support_tickets(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    sender_role TEXT NOT NULL, -- 'user', 'admin'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.support_messages ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE POLICY "Users can see messages for their tickets" ON public.support_messages
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.support_tickets
            WHERE id = ticket_id AND user_id = auth.uid()
        )
    );

CREATE OR REPLACE POLICY "Users can insert messages for their tickets" ON public.support_messages
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.support_tickets
            WHERE id = ticket_id AND user_id = auth.uid()
        )
    );

CREATE OR REPLACE POLICY "Admins can manage all messages" ON public.support_messages
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE id = auth.uid() AND role = 'admin'
        )
    );
