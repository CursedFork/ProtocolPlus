# Appwrite Setup Guide

Follow these steps once inside your Appwrite project at cloud.appwrite.io.

---

## 1. Add a Web Platform

**Project Settings → Platforms → Add Platform → Web**

- Name: `Protocol+`
- Hostname: `localhost` (for dev)

After deploying to Vercel, add a second Web platform entry with your Vercel domain.

---

## 2. Create a Database

**Databases → Create Database**

- Name: `protocol_plus`
- Database ID: copy this value → paste it as `VITE_APPWRITE_DATABASE_ID` in your `.env.local` and Vercel env vars

---

## 3. Create Collections

Create each collection below inside your database. Use the exact **Collection ID** shown — the code references these by name.

---

### Collection: `profiles`
**Collection ID:** `profiles`

**Permissions (Collection level):**
- Create: `users` (any logged-in user)

**Attributes:**
| Name | Type | Required |
|---|---|---|
| sex | String, size 6 | ✅ |
| age | Integer | ✅ |
| weight_lbs | Float | ✅ |
| height_ft | Integer | ✅ |
| height_in | Float | ✅ |
| activity_level | String, size 20 | ✅ |

---

### Collection: `weight_log`
**Collection ID:** `weight_log`

**Permissions (Collection level):**
- Create: `users`

**Attributes:**
| Name | Type | Required |
|---|---|---|
| user_id | String, size 36 | ✅ |
| date | String, size 10 | ✅ |
| weight_lbs | Float | ✅ |
| notes | String, size 200 | ❌ |

**Index:**
- Key: `user_date` · Type: Key · Attributes: `user_id` ASC, `date` DESC

---

### Collection: `strength_log`
**Collection ID:** `strength_log`

**Permissions (Collection level):**
- Create: `users`

**Attributes:**
| Name | Type | Required |
|---|---|---|
| user_id | String, size 36 | ✅ |
| date | String, size 10 | ✅ |
| exercise | String, size 100 | ✅ |
| weight_lbs | Float | ✅ |
| reps | Integer | ✅ |
| sets | Integer | ✅ |

**Index:**
- Key: `user_date` · Type: Key · Attributes: `user_id` ASC, `date` DESC

---

### Collection: `goals`
**Collection ID:** `goals`

**Permissions (Collection level):**
- Create: `users`

**Attributes:**
| Name | Type | Required |
|---|---|---|
| user_id | String, size 36 | ✅ |
| goal_id | String, size 20 | ✅ |
| title | String, size 100 | ✅ |
| target_value | Float | ✅ |
| current_value | Float | ✅ |
| unit | String, size 20 | ✅ |
| category | String, size 20 | ✅ |

**Index:**
- Key: `user_id` · Type: Key · Attributes: `user_id` ASC

---

### Collection: `habit_log`
**Collection ID:** `habit_log`

**Permissions (Collection level):**
- Create: `users`

**Attributes:**
| Name | Type | Required |
|---|---|---|
| user_id | String, size 36 | ✅ |
| date | String, size 10 | ✅ |
| habits | String[], size 50 each | ✅ |

**Index:**
- Key: `user_date` · Type: Key · Attributes: `user_id` ASC, `date` DESC

---

### Collection: `preferences`
**Collection ID:** `preferences`

**Permissions (Collection level):**
- Create: `users`

**Attributes:**
| Name | Type | Required | Default |
|---|---|---|---|
| workout_days | String[], size 10 each | ✅ | — |
| goal_mode | String, size 20 | ✅ | `strength` |

---

## 4. Environment Variables

### Local (`.env.local`)
```
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=<your project ID from Project Settings>
VITE_APPWRITE_DATABASE_ID=<your database ID from step 2>
```

### Vercel
Add the same three variables under **Project → Settings → Environment Variables**.

---

## 5. Auth Settings (optional)

By default Appwrite does **not** require email verification on sign-up, so new accounts work immediately.

To enable verification later: **Auth → Security → Email/Password → require email verification**.
