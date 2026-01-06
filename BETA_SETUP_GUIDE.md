# 🚀 SoulTune Beta Testing Setup Guide

## Was wir gebaut haben:

✅ **Beta-Signup-Section** - Komplett integriert in die Website
✅ **Responsive Formular** - Mit Glassmorphism Design
✅ **Client-Side Validation** - JavaScript Form-Handling
✅ **Stats Counter Animation** - Dynamische Zahlen-Animation

---

## 🔧 Noch zu tun: Google Forms Integration

### Step 1: Google Form erstellen

1. Gehe zu [Google Forms](https://forms.google.com)
2. Erstelle ein neues Formular namens **"SoulTune Beta Access"**
3. Füge folgende Felder hinzu:

   **Feld 1:** Kurzantwort
   - Frage: "Full Name"
   - Erforderlich: Ja

   **Feld 2:** Kurzantwort
   - Frage: "Email Address"
   - Erforderlich: Ja
   - Validierung: E-Mail-Adresse

   **Feld 3:** Multiple Choice
   - Frage: "Primary Use Case"
   - Erforderlich: Ja
   - Optionen:
     - Meditation & Mindfulness
     - Deep Focus & Productivity
     - Sleep & Recovery
     - Stress Relief & Relaxation
     - Biohacking & Optimization
     - Audiophile Experience

4. Klicke auf **"Senden"** und kopiere den Link

---

### Step 2: Google Form Entry IDs finden

1. Öffne das Google Formular im **Vorschaumodus**
2. Öffne die **Entwicklertools** (F12)
3. Gehe zum **Network Tab**
4. Fülle das Formular testweise aus und sende es ab
5. Suche nach einem Request der mit `formResponse` endet
6. Klicke darauf und gehe zu **"Payload"** oder **"Form Data"**
7. Du siehst die Entry IDs wie:
   ```
   entry.123456789 = John Doe
   entry.987654321 = john@example.com
   entry.555555555 = Meditation & Mindfulness
   ```

8. Notiere dir diese IDs!

---

### Step 3: JavaScript Konfiguration updaten

Öffne die Datei `Home/Section-BetaSignup/beta-signup.js` und ersetze:

```javascript
const CONFIG = {
    // Replace this with your actual Google Form URL
    googleFormURL: 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse',

    // Google Form field entry IDs
    formFields: {
        name: 'entry.YOUR_NAME_FIELD_ID',      // z.B. entry.123456789
        email: 'entry.YOUR_EMAIL_FIELD_ID',    // z.B. entry.987654321
        usecase: 'entry.YOUR_USECASE_FIELD_ID' // z.B. entry.555555555
    }
};
```

Mit deinen echten Werten:

```javascript
const CONFIG = {
    googleFormURL: 'https://docs.google.com/forms/d/e/1FAIpQLSdXXXXXXXXXXXXXXXX/formResponse',

    formFields: {
        name: 'entry.123456789',
        email: 'entry.987654321',
        usecase: 'entry.555555555'
    }
};
```

---

### Step 4: Automatische Email-Response einrichten

#### Option A: Google Forms Add-on (Einfachste Methode)

1. Öffne dein Google Formular
2. Klicke auf die **drei Punkte** (⋮) → **Add-ons**
3. Installiere **"Email Notifications for Google Forms"** oder **"Form Publisher"**
4. Konfiguriere:
   - **Trigger:** Bei jeder Antwort
   - **Email Template:**

```
Betreff: 🎵 Your SoulTune Beta Access is Ready!

Hi {{Name}},

Welcome to the SoulTune Beta Family! 🙌

You're now part of an exclusive group testing the future of frequency-based audio.

📦 Download the APK:
👉 [DEIN-APK-DOWNLOAD-LINK-HIER]

📝 Testing Instructions:
1. Install the APK on your Android device (requires Android 5.0+)
2. Grant necessary permissions for audio processing
3. Connect your Spotify or upload local music
4. Explore the frequency presets (432Hz, 528Hz, Binaural Beats)

💬 Share Your Feedback:
Join our beta community: [GOOGLE-GRUPPE-LINK]

Questions? Reply to this email or join the group chat.

Happy Testing!
The SoulTune Team

---
This is an automated message. You received this because you signed up for SoulTune Beta Access.
```

5. **APK Link einfügen:**
   - Lade deine APK auf **Google Drive**, **Dropbox**, oder **Firebase Hosting** hoch
   - Stelle den Link auf "Jeder mit dem Link kann ansehen"
   - Füge den Link in die Email-Vorlage ein

---

#### Option B: Google Apps Script (Fortgeschritten)

Wenn du mehr Kontrolle willst, kannst du ein Google Apps Script verwenden:

1. Öffne das Google Formular
2. Klicke auf **Tools** → **Script Editor**
3. Füge dieses Script ein:

```javascript
function onFormSubmit(e) {
  var response = e.response;
  var items = response.getItemResponses();

  var name = items[0].getResponse();
  var email = items[1].getResponse();
  var usecase = items[2].getResponse();

  var subject = "🎵 Your SoulTune Beta Access is Ready!";

  var body = "Hi " + name + ",\n\n" +
             "Welcome to the SoulTune Beta Family! 🙌\n\n" +
             "📦 Download the APK:\n" +
             "👉 DEIN-APK-LINK-HIER\n\n" +
             "💬 Join our beta community:\n" +
             "👉 GOOGLE-GRUPPE-LINK\n\n" +
             "Your primary interest: " + usecase + "\n\n" +
             "Happy Testing!\n" +
             "The SoulTune Team";

  MailApp.sendEmail(email, subject, body);
}
```

4. Speichere das Script
5. Gehe zu **Trigger** → **Trigger hinzufügen**
6. Wähle:
   - Funktion: `onFormSubmit`
   - Event: "Bei Formularübermittlung"

---

### Step 5: Google Testing Group erstellen

1. Gehe zu [Google Groups](https://groups.google.com)
2. Erstelle eine neue Gruppe: **"SoulTune Beta Testers"**
3. Einstellungen:
   - **Wer kann beitreten:** Nur auf Einladung
   - **Wer kann posten:** Gruppenmitglieder
   - **Sichtbarkeit:** Privat
4. Kopiere den Gruppen-Link
5. Füge ihn in die Email-Vorlage ein

---

### Step 6: APK Hosting

Du brauchst einen Ort, um die APK zu hosten:

#### Option 1: Google Drive (Schnell & Einfach)
1. Lade die APK in Google Drive hoch
2. Rechtsklick → "Link teilen"
3. Stelle auf "Jeder mit dem Link kann ansehen"
4. Kopiere den Link

#### Option 2: Firebase Hosting (Professioneller)
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
# Lade APK in public/ folder
firebase deploy
```

#### Option 3: GitHub Releases
1. Erstelle ein GitHub Release
2. Lade die APK als Asset hoch
3. Kopiere den Download-Link

---

## 🎨 Website-Updates nach dem Launch

### Dynamische Stats updaten

In `beta-signup.html` / `dev_preview.html` findest du:

```html
<span class="st-stat-number" data-target="127">0</span>
<span class="st-stat-label">Beta Testers</span>
```

**Update die Zahlen regelmäßig:**
- `data-target="127"` = Aktuelle Anzahl der Beta-Tester
- `data-target="23"` = Verfügbare Spots

Dies erzeugt FOMO (Fear of Missing Out) und erhöht Conversions!

---

## 📊 Tracking & Analytics (Optional)

Füge Google Analytics zu `dev_preview.html` hinzu:

```html
<head>
  <!-- ... andere tags ... -->

  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>
</head>
```

Die Beta-Signup-JS tracked automatisch Conversions wenn `gtag` verfügbar ist.

---

## ✅ Launch Checklist

- [ ] Google Form erstellt und konfiguriert
- [ ] Entry IDs in `beta-signup.js` eingefügt
- [ ] Automatische Email-Response eingerichtet
- [ ] APK hochgeladen und Link in Email-Vorlage
- [ ] Google Testing Group erstellt
- [ ] Website getestet (Formular ausfüllen & absenden)
- [ ] Email-Template getestet
- [ ] Stats-Zahlen aktualisiert
- [ ] Analytics (optional) eingerichtet

---

## 🚀 Go Live!

1. Uploade die Website zu deinem Hosting
2. Teste das Formular einmal komplett durch
3. Teile den Link: `https://deine-domain.com/#beta-access`
4. Poste in relevanten Communities:
   - Reddit: r/Meditation, r/Biohacking, r/audiophile
   - Facebook: Meditation & Frequency Groups
   - Twitter/X: #Biohacking #432Hz #SolfeggioFrequencies

---

## 💡 Pro Tips

1. **Scarcity Marketing:** Update die "Spots Left" Zahl regelmäßig runter
2. **Social Proof:** Füge Screenshots von Beta-Tester-Feedback hinzu
3. **Email Follow-Up:** Schicke nach 3 Tagen eine "How's it going?" Email
4. **Feedback Loop:** Erstelle ein Google Form für Bug Reports & Feature Requests

---

**Need Help?** Die komplette Code-Struktur ist fertig und wartet nur auf deine Google Form Konfiguration! 🎉
