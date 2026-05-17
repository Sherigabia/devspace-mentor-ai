'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import {
  User,
  Key,
  Bell,
  Palette,
  Shield,
  Save,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

// GitHub icon as SVG component (lucide-react doesn't include GitHub icon)
const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

export default function SettingsPage() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'github', label: 'GitHub', icon: GithubIcon },
    { id: 'api', label: 'API Keys', icon: Key },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen p-6 md:p-8">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[#c0c1ff] text-sm font-medium uppercase tracking-widest">
            Account Settings
          </span>
          <div className="w-2 h-2 rounded-full bg-[#c0c1ff] shadow-[0_0_8px_rgba(192,193,255,0.6)]" />
        </div>
        <h1 className="text-3xl md:text-4xl font-semibold text-white mb-2">
          Settings
        </h1>
        <p className="text-gray-400 max-w-xl">
          Manage your account preferences, integrations, and security settings.
        </p>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar Navigation */}
        <aside className="lg:col-span-3">
          <nav className="bg-[#1c1b1c] rounded-xl border border-[#464554] p-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id
                      ? 'bg-[#c0c1ff]/10 text-[#c0c1ff] border border-[#c0c1ff]/20'
                      : 'text-gray-400 hover:bg-[#353436] border border-transparent'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-9">
          <div className="bg-[#1c1b1c] rounded-xl border border-[#464554] p-6 md:p-8">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-white mb-1">Profile Information</h2>
                  <p className="text-gray-400 text-sm">Update your personal information and profile details.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue={user?.fullName || ''}
                      className="w-full px-4 py-3 bg-[#131314] border border-[#464554] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#c0c1ff] transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      defaultValue={user?.primaryEmailAddress?.emailAddress || ''}
                      className="w-full px-4 py-3 bg-[#131314] border border-[#464554] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#c0c1ff] transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Bio
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 bg-[#131314] border border-[#464554] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#c0c1ff] transition-colors resize-none"
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* GitHub Tab */}
            {activeTab === 'github' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-white mb-1">GitHub Integration</h2>
                  <p className="text-gray-400 text-sm">Manage your GitHub connection and repository access.</p>
                </div>

                <div className="bg-[#131314] border border-[#464554] rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#c0c1ff]/10 rounded-lg flex items-center justify-center">
                        <GithubIcon className="w-6 h-6 text-[#c0c1ff]" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium">GitHub Account</h3>
                        <p className="text-gray-400 text-sm">Connected</p>
                      </div>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Username</span>
                      <span className="text-white font-mono">{user?.username || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Repositories Access</span>
                      <span className="text-white">All repositories</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Last Synced</span>
                      <span className="text-white">2 minutes ago</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-[#464554] flex gap-3">
                    <button className="flex-1 px-4 py-2 bg-[#353436] text-white rounded-lg text-sm font-medium hover:bg-[#464554] transition-colors">
                      Refresh Connection
                    </button>
                    <button className="flex-1 px-4 py-2 border border-red-500/30 text-red-400 rounded-lg text-sm font-medium hover:bg-red-500/10 transition-colors">
                      Disconnect
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* API Keys Tab */}
            {activeTab === 'api' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-white mb-1">API Configuration</h2>
                  <p className="text-gray-400 text-sm">Manage your API keys and external integrations.</p>
                </div>

                <div className="space-y-4">
                  <div className="bg-[#131314] border border-[#464554] rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-white font-medium mb-1">IBM watsonx.ai</h3>
                        <p className="text-gray-400 text-sm">AI analysis and code understanding</p>
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="password"
                        value="••••••••••••••••••••"
                        readOnly
                        className="flex-1 px-4 py-2 bg-[#0e0e0f] border border-[#464554] rounded-lg text-white text-sm font-mono"
                      />
                      <button className="px-4 py-2 bg-[#353436] text-white rounded-lg text-sm font-medium hover:bg-[#464554] transition-colors">
                        Update
                      </button>
                    </div>
                  </div>

                  <div className="bg-[#131314] border border-[#464554] rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-white font-medium mb-1">Supabase</h3>
                        <p className="text-gray-400 text-sm">Database and caching layer</p>
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="password"
                        value="••••••••••••••••••••"
                        readOnly
                        className="flex-1 px-4 py-2 bg-[#0e0e0f] border border-[#464554] rounded-lg text-white text-sm font-mono"
                      />
                      <button className="px-4 py-2 bg-[#353436] text-white rounded-lg text-sm font-medium hover:bg-[#464554] transition-colors">
                        Update
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-yellow-200 text-sm font-medium mb-1">Security Notice</p>
                    <p className="text-yellow-200/80 text-sm">
                      Never share your API keys. They provide full access to your account and services.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-white mb-1">Notification Preferences</h2>
                  <p className="text-gray-400 text-sm">Choose what updates you want to receive.</p>
                </div>

                <div className="space-y-4">
                  {[
                    { label: 'Repository Analysis Complete', description: 'Get notified when AI finishes analyzing a repository' },
                    { label: 'New Learning Path Available', description: 'Receive updates about new learning opportunities' },
                    { label: 'Documentation Generated', description: 'Alert when documentation is ready to review' },
                    { label: 'Weekly Progress Report', description: 'Summary of your learning progress and achievements' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start justify-between p-4 bg-[#131314] border border-[#464554] rounded-lg">
                      <div className="flex-1">
                        <h3 className="text-white font-medium mb-1">{item.label}</h3>
                        <p className="text-gray-400 text-sm">{item.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer ml-4">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-[#353436] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#c0c1ff]"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-white mb-1">Security Settings</h2>
                  <p className="text-gray-400 text-sm">Manage your account security and privacy.</p>
                </div>

                <div className="space-y-4">
                  <div className="bg-[#131314] border border-[#464554] rounded-lg p-6">
                    <h3 className="text-white font-medium mb-4">Two-Factor Authentication</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Add an extra layer of security to your account.
                    </p>
                    <button className="px-4 py-2 bg-[#c0c1ff] text-[#07006c] rounded-lg text-sm font-medium hover:shadow-[0_0_20px_rgba(192,193,255,0.3)] transition-all">
                      Enable 2FA
                    </button>
                  </div>

                  <div className="bg-[#131314] border border-[#464554] rounded-lg p-6">
                    <h3 className="text-white font-medium mb-4">Active Sessions</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white text-sm">Current Session</p>
                          <p className="text-gray-400 text-xs">Windows • Chrome • Reykjavik, Iceland</p>
                        </div>
                        <span className="text-green-500 text-xs font-medium">Active</span>
                      </div>
                    </div>
                    <button className="mt-4 text-red-400 text-sm font-medium hover:underline">
                      Sign out all other sessions
                    </button>
                  </div>

                  <div className="bg-[#131314] border border-[#464554] rounded-lg p-6">
                    <h3 className="text-white font-medium mb-2">Delete Account</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Permanently delete your account and all associated data.
                    </p>
                    <button className="px-4 py-2 border border-red-500/30 text-red-400 rounded-lg text-sm font-medium hover:bg-red-500/10 transition-colors flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="mt-8 pt-6 border-t border-[#464554] flex items-center justify-between">
              {saved && (
                <div className="flex items-center gap-2 text-green-500 text-sm font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  Settings saved successfully
                </div>
              )}
              {!saved && <div />}
              <button
                onClick={handleSave}
                className="px-6 py-3 bg-[#c0c1ff] text-[#07006c] rounded-lg text-sm font-medium hover:shadow-[0_0_20px_rgba(192,193,255,0.3)] transition-all flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// Made with Bob
