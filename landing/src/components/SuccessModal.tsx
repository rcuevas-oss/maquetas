import { CheckCircle2 } from "lucide-react";
import { Button } from "./Button";
import { Modal } from "./Modal";

interface Props {
  open: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

export function SuccessModal({
  open,
  onClose,
  title = "Recibimos tu solicitud",
  message = "Te contactaremos en menos de 48 horas para activar tu RiderBio. Mientras tanto, te recomendamos seguirnos en nuestras redes.",
}: Props) {
  return (
    <Modal open={open} onClose={onClose} size="sm">
      <div className="text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-accent/15 text-accent">
          <CheckCircle2 size={28} />
        </div>
        <h3 className="mt-4 heading-3">{title}</h3>
        <p className="mt-2 text-sm text-zinc-400">{message}</p>
        <div className="mt-6">
          <Button fullWidth onClick={onClose}>
            Volver a la demo
          </Button>
        </div>
      </div>
    </Modal>
  );
}
