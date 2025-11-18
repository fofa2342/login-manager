# Frontend Changes Required for Authentication

To ensure proper cross-origin authentication with the updated backend, you need to make the following change in your frontend application (`https://marche-pagne.vercel.app`):

**Ensure all `fetch()` or `axios` calls to the authentication service include `credentials: "include"`.**

This is crucial for browsers to send cookies (like the session cookie) with cross-origin requests.

### Example using `fetch()`:

```javascript
fetch("https://auth-iota-olive.vercel.app/some-route", {
  method: "POST",
  credentials: "include", // <--- Add this line
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({...})
});
```

### Example using `axios`:

```javascript
axios.post("https://auth-iota-olive.vercel.app/some-route", data, {
  withCredentials: true // <--- Add this line
});
```

After making this change in your frontend code, please redeploy both your backend (`login-manager`) and frontend (`marche-pagne.vercel.app`) applications to Vercel.