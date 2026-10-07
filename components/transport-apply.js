"use client";

import { useMemo, useState } from "react";
import { applyForTransport } from "@/lib/actions/academic";
import { ROUTES } from "@/lib/constants";
import { money } from "@/lib/format";
import { Button, Note, fieldClass } from "@/components/ui";
import { useAction } from "@/components/use-action";

export function TransportApply({ windowId }) {
  const { message, ok, pending, run } = useAction();
  const [pickup, setPickup] = useState(ROUTES[0].name);
  const fee = useMemo(() => ROUTES.find((route) => route.name === pickup)?.fee || 0, [pickup]);

  return (
    <form
      className="mt-8 grid gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        run(applyForTransport, event.currentTarget);
      }}
    >
      <input type="hidden" name="window_id" value={windowId} />
      <label className="block">
        <span className="mb-1.5 block text-[11px] uppercase tracking-[0.16em] text-mute">Pickup point</span>
        <select name="pickup_point" className={fieldClass} value={pickup} onChange={(event) => setPickup(event.target.value)}>
          {ROUTES.map((route) => (
            <option key={route.name} value={route.name}>{route.name}</option>
          ))}
        </select>
      </label>
      <p className="text-sm">Fee {money(fee)}</p>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[28rem] text-left text-sm">
          <thead className="border-b border-line text-mute">
            <tr>
              <th className="py-2 font-normal">Route</th>
              <th className="py-2 font-normal">Fee</th>
            </tr>
          </thead>
          <tbody>
            {ROUTES.map((route) => (
              <tr key={route.name} className="border-b border-line">
                <td className="py-3 pr-4">{route.name}</td>
                <td className="py-3">{money(route.fee)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Note ok={ok}>{message}</Note>
      <Button disabled={pending} className="w-fit">{pending ? "Sending…" : "Request card"}</Button>
    </form>
  );
}
