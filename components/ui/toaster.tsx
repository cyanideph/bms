"use client"

<<<<<<< HEAD
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
=======
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
<<<<<<< HEAD
      {toasts.map(({ id, title, description, action, ...props }) => (
        <Toast key={id} {...props}>
          <div className="grid gap-1">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          {action}
          <ToastClose />
        </Toast>
      ))}
=======
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
      <ToastViewport />
    </ToastProvider>
  )
}
<<<<<<< HEAD

=======
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
