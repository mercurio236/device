import { Header } from '@/components/Header'
import { Outlet } from 'react-router-dom'

export function AppLayout() {
  return (
    <div>
      <Header />
      <div
        style={{
          display: 'flex',
          flex: 1,
          paddingTop: 6,
          margin: 10,
          gap: 4,
          flexDirection: 'column',
        }}
      >
        <Outlet />
      </div>
    </div>
  )
}
