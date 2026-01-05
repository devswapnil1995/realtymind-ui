import { UserSubscription } from "../../models/user-subscription";

export function hasPro(sub: UserSubscription): boolean {
  return sub.isActive && (sub.plan === 'Pro' || sub.plan === 'Agent');
}