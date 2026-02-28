'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

import { useAuth } from '@/hooks/use-auth'
import {
  BookOpen,
  Bot,
  ChevronDown,
  ChevronRight,
  History,
  LayoutDashboard,
  LogOut,
  Megaphone,
  Send,
  Settings,
  SlidersHorizontal,
} from 'lucide-react'
import { useRouter } from 'next/navigation'

export function AppSidebar() {
  const { user, logout } = useAuth()
  const router = useRouter()

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  className='
                    group-data-[collapsible=icon]:justify-center
                  '
                >
                  <div className='flex items-center gap-3'>
                    <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground'>
                      <Bot className='h-4 w-4 shrink-0' />
                    </div>

                    <div className='flex flex-col text-left group-data-[collapsible=icon]:hidden'>
                      <span className='text-sm font-semibold'>{process.env.NEXT_PUBLIC_APP_NAME}</span>
                      <span className='text-xs text-muted-foreground'>{process.env.NEXT_PUBLIC_APP_VERSION}</span>
                    </div>
                  </div>

                  <ChevronDown className='ml-auto group-data-[collapsible=icon]:hidden' />
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent align='start'>
                <DropdownMenuItem>@BJR</DropdownMenuItem>
                <DropdownMenuItem>
                  [VERSION]::[{process.env.NEXT_PUBLIC_APP_VERSION}]
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className='group-data-[collapsible=icon]:hidden'>
            Itens do menu
          </SidebarGroupLabel>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => {
                router.push('/dashboard')
              }}
              className='group-data-[collapsible=icon]:justify-center'
            >
              <LayoutDashboard className='h-4 w-4 shrink-0' />
              <span className='group-data-[collapsible=icon]:hidden'>Dashboard</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenu>
            <Collapsible defaultOpen className='group/collapsible'>
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    className='
                      flex items-center gap-2
                      group-data-[collapsible=icon]:justify-center
                    '
                  >
                    <Megaphone className='h-4 w-4 shrink-0' />

                    <span className='group-data-[collapsible=icon]:hidden'>Notificações</span>

                    <ChevronRight
                      className='
                        ml-auto transition-transform
                        group-data-[collapsible=icon]:hidden
                        group-data-[state=open]/collapsible:rotate-90
                      '
                    />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
              </SidebarMenuItem>

              <CollapsibleContent className='group-data-[collapsible=icon]:hidden'>
                <div className='ml-6 flex flex-col gap-1'>
                  <SidebarMenuButton
                    size='sm'
                    onClick={() => {
                      router.push('/notifier/new')
                    }}
                  >
                    <Send className='mr-2 h-4 w-4' />
                    Disparar mensagem
                  </SidebarMenuButton>
                  <SidebarMenuButton size='sm'>
                    <History className='mr-2 h-4 w-4' />
                    Histórico de envios
                  </SidebarMenuButton>
                  <SidebarMenuButton
                    size='sm'
                    onClick={() => {
                      router.push('/notifier/connect')
                    }}
                  >
                    <Settings className='mr-2 h-4 w-4' />
                    Gerenciar conexão
                  </SidebarMenuButton>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <SidebarMenuItem>
              <SidebarMenuButton className='group-data-[collapsible=icon]:justify-center'>
                <BookOpen className='h-4 w-4 shrink-0' />
                <span className='group-data-[collapsible=icon]:hidden'>Importar agenda</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton className='group-data-[collapsible=icon]:justify-center'>
                <SlidersHorizontal className='h-4 w-4 shrink-0' />
                <span className='group-data-[collapsible=icon]:hidden'>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={logout}
                className='group-data-[collapsible=icon]:justify-center'
              >
                <LogOut className='h-4 w-4 shrink-0' />
                <span className='group-data-[collapsible=icon]:hidden'>Sair</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className='group-data-[collapsible=icon]:justify-center'>
              <div className='flex items-center gap-3'>

                <div className='flex flex-col text-left group-data-[collapsible=icon]:hidden'>
                  <span className='text-sm font-medium'>{user?.name}</span>
                  <span className='text-xs text-muted-foreground'>{user?.email}</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
