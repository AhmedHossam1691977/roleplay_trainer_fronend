"use client";

import { useState } from "react";
import { Users, UserCheck, Shield, Search, Mail, Pencil, Trash2 } from "lucide-react";

const mockUsers = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@company.com",
    role: "USER",
    status: "Active",
    joined: "Jan 15, 2024",
    sessions: 24,
    avgScore: "87%",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@company.com",
    role: "ADMIN",
    status: "Active",
    joined: "Jan 10, 2024",
    sessions: 45,
    avgScore: "92%",
  },
];

export default function UsersPage() {
  const [users] = useState(mockUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");

  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    const matchesSearch =
      u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    const matchesRole = roleFilter === "ALL" ? true : u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const stats = {
    total: users.length,
    active: users.filter((u) => u.status === "Active").length,
    admins: users.filter((u) => u.role === "ADMIN").length,
  };

  return (
    <div className="px-6 py-6 max-w-[1400px]">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              User Management
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage users, roles, and permissions
            </p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-sm">
            <span className="text-lg">+</span>
            Add User
          </button>
        </div>
      </header>

      {/* Stats Cards */}
      <section className="mb-6 grid gap-6 md:grid-cols-3 mt-3">
        {/* Total Users Card */}
        <div className="rounded-2xl border border-gray-200 bg-white px-6 py-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-sm font-medium text-gray-700">Total Users</p>
          </div>
          <p className="text-3xl font-semibold text-gray-900">{stats.total}</p>
        </div>

        {/* Active Users Card */}
        <div className="rounded-2xl border border-gray-200 bg-white px-6 py-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
              <UserCheck className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-sm font-medium text-gray-700">Active Users</p>
          </div>
          <p className="text-3xl font-semibold text-gray-900">{stats.active}</p>
        </div>

        {/* Administrators Card */}
        <div className="rounded-2xl border border-gray-200 bg-white px-6 py-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100">
              <Shield className="h-5 w-5 text-purple-600" />
            </div>
            <p className="text-sm font-medium text-gray-700">Administrators</p>
          </div>
          <p className="text-3xl font-semibold text-gray-900">{stats.admins}</p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="mb-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 mt-2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users..."
              className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>

          {/* Role Filter Buttons */}
          <div className="inline-flex items-center rounded-lg bg-gray-100 p-1">
            <button
              onClick={() => setRoleFilter("ALL")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap ${
                roleFilter === "ALL"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              All Roles
            </button>
            <button
              onClick={() => setRoleFilter("USER")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                roleFilter === "USER"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              USER
            </button>
            <button
              onClick={() => setRoleFilter("ADMIN")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                roleFilter === "ADMIN"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              ADMIN
            </button>
          </div>
        </div>
      </section>

      {/* Users Table - MORE PADDING IN HEADER */}
      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm mt-6">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Sessions
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Avg Score
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filtered.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.role === "ADMIN" ? (
                      <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium bg-purple-100 text-purple-700">
                        <Shield className="h-3 w-3" />
                        ADMIN
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-700">
                        USER
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {user.joined}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.sessions}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.avgScore}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors">
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors">
                        <Mail className="h-4 w-4" />
                      </button>
                      <button className="p-1.5 text-red-400 hover:text-red-600 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
