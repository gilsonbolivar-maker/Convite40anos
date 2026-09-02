import { InvitationData } from '../types';
import { DEFAULT_INVITATION_DATA } from '../data/defaultData';

/**
 * Encodes an edited invitation into a link, so the card can be sent as a URL
 * that opens showing only the invitation.
 *
 * Only the fields the user actually changed travel in the link, which keeps a
 * typical link short. Uploaded images arrive as `data:` URIs — far too large
 * for a URL — so they are left behind and the card falls back to its theme.
 */

export const SHARE_HASH_KEY = 'c';

const toBase64Url = (value: string): string => {
  const bytes = new TextEncoder().encode(value);
  let binary = '';
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

const fromBase64Url = (value: string): string => {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/');
  const binary = atob(padded + '='.repeat((4 - (padded.length % 4)) % 4));
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
};

/** Fields that changed from the defaults, minus anything too big for a URL. */
const collectChanges = (data: InvitationData): Partial<InvitationData> => {
  const changes: Record<string, unknown> = {};

  (Object.keys(DEFAULT_INVITATION_DATA) as (keyof InvitationData)[]).forEach((key) => {
    const value = data[key];
    if (value === DEFAULT_INVITATION_DATA[key]) return;
    if (typeof value === 'string' && value.startsWith('data:')) return;
    changes[key] = value;
  });

  return changes as Partial<InvitationData>;
};

/** Builds the absolute link that reopens this invitation. */
export const buildInvitationLink = (data: InvitationData): string => {
  const { origin, pathname } = window.location;
  const payload = toBase64Url(JSON.stringify(collectChanges(data)));
  return `${origin}${pathname}#${SHARE_HASH_KEY}=${payload}`;
};

/**
 * Reads an invitation out of the current URL. Returns null when the URL carries
 * none, and also when it carries something unreadable — a truncated link should
 * open the normal editor rather than a broken card.
 */
export const readInvitationFromUrl = (): Partial<InvitationData> | null => {
  const hash = window.location.hash.replace(/^#/, '');
  if (!hash.startsWith(`${SHARE_HASH_KEY}=`)) return null;

  try {
    const parsed = JSON.parse(fromBase64Url(hash.slice(SHARE_HASH_KEY.length + 1)));
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return null;

    // Keep only known fields whose type matches the default, so a hand-edited
    // link cannot inject unexpected values into the card.
    const safe: Record<string, unknown> = {};
    Object.entries(parsed as Record<string, unknown>).forEach(([key, value]) => {
      if (!(key in DEFAULT_INVITATION_DATA)) return;
      const reference = DEFAULT_INVITATION_DATA[key as keyof InvitationData];
      if (reference !== null && typeof value !== typeof reference) return;
      safe[key] = value;
    });

    return safe as Partial<InvitationData>;
  } catch {
    return null;
  }
};
