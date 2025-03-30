"use client"

import { useState } from "react"
import { Bell, ChevronDown, HelpCircle, LogOut, Menu, Search, Settings, User } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Link } from "react-router-dom"

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const mainNavItems = [
    { name: "Исходные данные", href: "/" },
    { name: "ЛЧ", href: "/lch" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-blue-900 text-white shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo and Company Name */}
        <div className="flex items-center space-x-2">
          <div className="hidden md:block">
            <Link to="/" className="flex items-center space-x-2">
              <div className="rounded-md bg-white p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-blue-900"
                >
                  <path d="M14 2a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H8.5l-1.3 1.5A1 1 0 0 1 6 10V8a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h8Z" />
                  <path d="M4 15v-3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1" />
                  <path d="M6 8v12" />
                  <path d="M2 20h4" />
                </svg>
              </div>
              <span className="text-xl font-bold">Газпром трансгаз</span>
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Открыть меню</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] bg-blue-900 text-white">
              <div className="flex flex-col space-y-6 py-4">
                <Link to="/" className="flex items-center space-x-2 px-4" onClick={() => setIsMobileMenuOpen(false)}>
                  <div className="rounded-md bg-white p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-blue-900"
                    >
                      <path d="M14 2a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H8.5l-1.3 1.5A1 1 0 0 1 6 10V8a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h8Z" />
                      <path d="M4 15v-3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1" />
                      <path d="M6 8v12" />
                      <path d="M2 20h4" />
                    </svg>
                  </div>
                  <span className="text-xl font-bold">Газпром трансгаз</span>
                </Link>
                <div className="space-y-1 px-2">
                  {mainNavItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="block rounded-md px-3 py-2 text-base font-medium hover:bg-blue-800"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="px-4 pt-6">
                  <div className="border-t border-blue-800 pt-4">
                    <p className="text-sm text-blue-300">Вошли как</p>
                    <p className="font-medium">user@gazprom.ru</p>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:!flex md:flex-1 md:items-center md:justify-start">
          <ul className="flex space-x-1">
            {mainNavItems.map((item) => (
              <li key={item.name}>
                <Link to={item.href} className="rounded-md px-3 py-2 text-sm font-medium hover:bg-blue-800">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="text-white hover:bg-blue-800">
            <Search className="h-5 w-5" />
            <span className="sr-only">Поиск</span>
          </Button>

          <Button variant="ghost" size="icon" className="text-white hover:bg-blue-800">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Уведомления</span>
          </Button>

          <Button variant="ghost" size="icon" className="text-white hover:bg-blue-800">
            <HelpCircle className="h-5 w-5" />
            <span className="sr-only">Помощь</span>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 text-white hover:bg-blue-800">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" alt="Аватар пользователя" />
                  <AvatarFallback className="bg-blue-700">ИП</AvatarFallback>
                </Avatar>
                <div className="hidden text-left md:block">
                  <p className="text-sm font-medium">Иван Петров</p>
                  <p className="text-xs text-blue-200">Инженер</p>
                </div>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Профиль</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Настройки</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Выйти</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Secondary Navigation / Breadcrumbs */}
      <div className="border-t border-blue-800 bg-blue-800 px-4 py-2">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-blue-200">Приморское ЛПУ МГ(МГ)</span>
            <span className="text-blue-200">/</span>
            <span>Таблицы данных</span>
          </div>
          <div className="text-sm">
            <span className="text-blue-200">Март 2024</span>
          </div>
        </div>
      </div>
    </header>
  )
}

