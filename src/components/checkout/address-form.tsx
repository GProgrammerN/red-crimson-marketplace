"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

const addressSchema = z.object({
  customerName: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  customerEmail: z.string().email("Email inválido"),
  customerPhone: z.string().optional(),
  street: z.string().min(5, "Endereço deve ter pelo menos 5 caracteres"),
  neighborhood: z.string().optional(),
  city: z.string().min(2, "Cidade é obrigatória"),
  state: z.string().length(2, "Estado deve ter 2 caracteres (ex: SP)"),
  zipCode: z.string().regex(/^\d{5}-?\d{3}$/, "CEP inválido (ex: 01234-567)"),
  complement: z.string().optional(),
});

export type AddressFormData = z.infer<typeof addressSchema>;

type AddressFormProps = {
  onSubmit: (data: AddressFormData) => Promise<void>;
  isProcessing: boolean;
};

export function AddressForm({ onSubmit, isProcessing }: AddressFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Name */}
        <div className="sm:col-span-2">
          <Label htmlFor="customerName">Nome Completo</Label>
          <Input
            id="customerName"
            placeholder="Seu nome completo"
            {...register("customerName")}
          />
          {errors.customerName && (
            <p className="mt-1 text-xs text-destructive">
              {errors.customerName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="customerEmail">Email</Label>
          <Input
            id="customerEmail"
            type="email"
            placeholder="seu@email.com"
            {...register("customerEmail")}
          />
          {errors.customerEmail && (
            <p className="mt-1 text-xs text-destructive">
              {errors.customerEmail.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <Label htmlFor="customerPhone">Telefone (opcional)</Label>
          <Input
            id="customerPhone"
            placeholder="(11) 99999-9999"
            {...register("customerPhone")}
          />
        </div>

        {/* Street */}
        <div className="sm:col-span-2">
          <Label htmlFor="street">Endereço</Label>
          <Input
            id="street"
            placeholder="Rua, número"
            {...register("street")}
          />
          {errors.street && (
            <p className="mt-1 text-xs text-destructive">
              {errors.street.message}
            </p>
          )}
        </div>

        {/* Neighborhood */}
        <div>
          <Label htmlFor="neighborhood">Bairro (opcional)</Label>
          <Input
            id="neighborhood"
            placeholder="Seu bairro"
            {...register("neighborhood")}
          />
        </div>

        {/* Complement */}
        <div>
          <Label htmlFor="complement">Complemento (opcional)</Label>
          <Input
            id="complement"
            placeholder="Apto, Bloco, etc."
            {...register("complement")}
          />
        </div>

        {/* City */}
        <div>
          <Label htmlFor="city">Cidade</Label>
          <Input
            id="city"
            placeholder="Sua cidade"
            {...register("city")}
          />
          {errors.city && (
            <p className="mt-1 text-xs text-destructive">
              {errors.city.message}
            </p>
          )}
        </div>

        {/* State + ZIP */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="state">Estado</Label>
            <Input
              id="state"
              placeholder="SP"
              maxLength={2}
              className="uppercase"
              {...register("state")}
            />
            {errors.state && (
              <p className="mt-1 text-xs text-destructive">
                {errors.state.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="zipCode">CEP</Label>
            <Input
              id="zipCode"
              placeholder="01234-567"
              {...register("zipCode")}
            />
            {errors.zipCode && (
              <p className="mt-1 text-xs text-destructive">
                {errors.zipCode.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        className="mt-6 w-full gap-2"
        disabled={isProcessing}
      >
        {isProcessing ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Processando...
          </>
        ) : (
          "Finalizar Pagamento"
        )}
      </Button>
    </form>
  );
}
