'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { TrendingUp, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAlerts } from '@/hooks/useAlerts';
import type { Alert } from '@/types/alert';

export function TrendAlertPopup() {
  const router = useRouter();
  const { alerts, markAsRead } = useAlerts({ unreadOnly: true, refreshInterval: 5000 });
  const [visibleAlert, setVisibleAlert] = useState<Alert | null>(null);
  const shownAlertIds = useRef<Set<string>>(new Set());

  // --- pick the first unseen DISEASE_TREND alert ---
  const getNextTrendAlert = useCallback((): Alert | null => {
    return (
      alerts.find(
        (a) =>
          a.alertType === 'DISEASE_TREND' &&
          !a.isRead &&
          !shownAlertIds.current.has(a.id)
      ) || null
    );
  }, [alerts]);

  useEffect(() => {
    // Only trigger if we are not already showing a popup
    if (visibleAlert) return;

    const next = getNextTrendAlert();
    if (next) {
      shownAlertIds.current.add(next.id);
      setVisibleAlert(next);
    }
  }, [alerts, visibleAlert, getNextTrendAlert]);

  const handleDismiss = useCallback(async () => {
    if (!visibleAlert) return;
    // Mark as read in the DB (fire-and-forget is fine; the next poll will reflect it)
    markAsRead(visibleAlert.id).catch(() => {});
    setVisibleAlert(null);
  }, [visibleAlert, markAsRead]);

  if (!visibleAlert) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[50] bg-black/40 flex items-center justify-center"
        onClick={handleDismiss}
      >
        {/* Card -- stop click propagation so clicking the card does not dismiss */}
        <div
          className="relative bg-white rounded-2xl shadow-[0_8px_40px_rgba(196,30,58,0.25)] w-full max-w-md mx-4 p-6"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
            onClick={handleDismiss}
            aria-label="Dismiss alert"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Icon + severity badge row */}
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-orange-50">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <Badge className="text-xs text-white bg-orange-500">HIGH</Badge>
              <p className="text-xs text-gray-500 mt-0.5">Disease Trend Alert</p>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-lg font-bold text-gray-800 mb-2">
            {visibleAlert.title}
          </h2>

          {/* Message */}
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            {visibleAlert.message}
          </p>

          {/* Disease tag */}
          {visibleAlert.relatedDisease && (
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs text-gray-500 font-medium">Disease:</span>
              <Badge variant="outline" className="text-xs border-[#C41E3A] text-[#C41E3A]">
                {visibleAlert.relatedDisease}
              </Badge>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDismiss}
              className="text-xs"
            >
              Dismiss
            </Button>
            <Button
              size="sm"
              className="bg-[#C41E3A] hover:bg-[#A01828] text-xs"
              onClick={() => {
                router.push('/alerts');
              }}
            >
              View All Alerts
            </Button>
          </div>

        </div>
      </div>
    </>
  );
}
