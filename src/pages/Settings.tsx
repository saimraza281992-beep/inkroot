import React, { useState } from 'react';
import { Bell, Shield, Eye, Moon, Globe, Key, Save } from 'lucide-react';

export function Settings() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    mentions: true,
    newsletter: false
  });

  const [privacy, setPrivacy] = useState({
    publicProfile: true,
    showLocation: false,
    allowMessages: true
  });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-playfair font-bold text-text mb-4">Settings</h1>
        <p className="text-text opacity-80 text-lg">
          Manage your account preferences, notifications, and privacy settings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Settings Navigation */}
        <div className="col-span-1">
          <nav className="flex flex-col gap-2 sticky top-8">
            <button className="flex items-center gap-3 px-4 py-3 bg-accent/10 text-accent rounded-lg font-medium text-left">
              <Bell size={20} />
              Notifications
            </button>
            <button className="flex items-center gap-3 px-4 py-3 text-text opacity-70 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg font-medium text-left transition-colors">
              <Shield size={20} />
              Privacy & Safety
            </button>
            <button className="flex items-center gap-3 px-4 py-3 text-text opacity-70 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg font-medium text-left transition-colors">
              <Eye size={20} />
              Appearance
            </button>
            <button className="flex items-center gap-3 px-4 py-3 text-text opacity-70 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg font-medium text-left transition-colors">
              <Key size={20} />
              Account Security
            </button>
          </nav>
        </div>

        {/* Settings Content */}
        <div className="col-span-1 md:col-span-2 space-y-8">
          
          {/* Notifications Section */}
          <section className="bg-surface border border-border rounded-xl p-6 md:p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-text mb-6 flex items-center gap-2">
              <Bell className="text-accent" />
              Notification Preferences
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-text">Email Notifications</h3>
                  <p className="text-sm text-text opacity-70">Receive updates about your works and comments via email.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={notifications.email} onChange={() => setNotifications({...notifications, email: !notifications.email})} />
                  <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-text">Push Notifications</h3>
                  <p className="text-sm text-text opacity-70">Get notified instantly in your browser.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={notifications.push} onChange={() => setNotifications({...notifications, push: !notifications.push})} />
                  <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-text">Mentions & Replies</h3>
                  <p className="text-sm text-text opacity-70">Notify me when someone replies to my comment or mentions me.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={notifications.mentions} onChange={() => setNotifications({...notifications, mentions: !notifications.mentions})} />
                  <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-text">Weekly Newsletter</h3>
                  <p className="text-sm text-text opacity-70">A weekly digest of top stories and community news.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={notifications.newsletter} onChange={() => setNotifications({...notifications, newsletter: !notifications.newsletter})} />
                  <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                </label>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-border flex justify-end">
              <button className="px-6 py-2 bg-accent text-white rounded-lg font-medium hover:bg-accent-secondary transition-colors flex items-center gap-2">
                <Save size={18} />
                Save Changes
              </button>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
