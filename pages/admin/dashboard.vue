<script setup lang="ts">
import { User } from "@prisma/client";

definePageMeta({
  name: "Dashboard",
  title: "Dashboard",
});

const { data: users, pending } = await useLazyFetch<User[]>("/api/admin/users");

const default_avatar = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";
</script>

<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-primary">Users</h1>
        <p class="mt-2 text-sm text-muted">A list of all the users in your account including their name, title, email and role.</p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button type="button" class="inline-flex items-center justify-center rounded-md border border-transparent bg-accent px-4 py-2 text-sm font-medium text-inverted shadow-sm hover:bg-accent-hover">Add user</button>
      </div>
    </div>
    <Loader v-if="pending" />
    <div class="mt-8 flex flex-col" v-else>
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-secondary">
              <tr>
                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-primary sm:pl-6">Name</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-primary">Status</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-primary">Role</th>
                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span class="sr-only">Edit</span>
                </th>
                <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span class="sr-only">Delete</span>
                </th>
              </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-secondary">
              <tr v-for="user in users" :key="user.email">
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                  <div class="flex items-center">
                    <div class="h-10 w-10 flex-shrink-0">
                      <img class="h-10 w-10 rounded-full" :src="user.profilePicture ?? default_avatar" alt="">
                    </div>
                    <div class="ml-4">
                      <div class="font-medium text-primary">{{ user.firstname }} {{ user.lastname }}</div>
                      <div class="text-muted">{{ user.email }}</div>
                    </div>
                  </div>
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <span class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">Active</span>
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-primary">{{ user.role === 1 ? "User" : "Admin" }}</td>
                <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <a href="#" class="text-accent hover:text-accent-hover"
                  >Edit<span class="sr-only">, {{ user.firstname }} {{ user.lastname }}</span></a
                  >
                </td>
                <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <a href="#" class="text-red-600 hover:text-red-900"
                  >Delete<span class="sr-only">, {{ user.firstname }} {{ user.lastname }}</span></a
                  >
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>