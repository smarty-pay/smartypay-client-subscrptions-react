/*
  Smarty Pay Client Subscriptions React
  @author Evgeny Dolganov <evgenij.dolganov@gmail.com>
*/

import { useEffect, useState } from 'react';
import { SmartyPaySubscriptionsBrowser } from 'smartypay-client-subscriptions';

export function useSmartyApiLocked() {
  const [isApiLocked, setApiLocked] = useState<boolean>(SmartyPaySubscriptionsBrowser.isApiLocked());
  useEffect(() => {
    function updateState() {
      setApiLocked(SmartyPaySubscriptionsBrowser.isApiLocked());
    }

    updateState();

    SmartyPaySubscriptionsBrowser.addListener('api-locked', updateState);
    SmartyPaySubscriptionsBrowser.addListener('api-unlocked', updateState);

    return () => {
      SmartyPaySubscriptionsBrowser.removeListener(updateState);
    };
  }, []);
  return isApiLocked;
}
