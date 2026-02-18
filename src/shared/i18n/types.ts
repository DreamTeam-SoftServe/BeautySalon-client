// shared/i18n/types.ts
// Single source of truth for the translation shape.
// Adding a new key here will cause TypeScript to error
// on any locale file that doesn't implement it.

export type Locale = 'en' | 'fr' | 'uk'

export interface Translations {
  lang: Locale
  dir: 'ltr' | 'rtl'

  hero: {
    eyebrow: string
    line1: string
    line2: string
    line3: string
    body: string
    ctaPrimary: string
    ctaSecondary: string
    stat1Value: string
    stat1Label: string
    stat2Value: string
    stat2Label: string
    stat3Value: string
    stat3Label: string
  }

  cta: {
    eyebrow: string
    heading: string
    button: string
  }

  services: {
    sectionEyebrow: string
    sectionTitle: string
    filterAll: string
    bookCta: string
    offeringsEyebrow: string
    offeringsTitle: string
    offeringsBody: string
    menuEyebrow: string
    menuTitle: string
    unit: {
      min: string
      from: string
    }
  }

  masters: {
    sectionEyebrow: string
    sectionTitle: string
    bookCta: string
    pageEyebrow: string
    pageTitle: string
    pageBody: string
    yearsUnit: string
  }

  booking: {
    pageEyebrow: string
    pageTitle: string
    pageBody: string
    fields: {
      name: string
      email: string
      phone: string
      service: string
      master: string
      date: string
      time: string
      notes: string
      namePh: string
      emailPh: string
      phonePh: string
      notesPh: string
      selectPh: string
    }
    submit: string
    sending: string
    success: {
      title: string
      reference: string
      body: string
      again: string
    }
    errors: {
      required: string
      email: string
      phone: string
      service: string
      date: string
      time: string
      slot: string
      session: string
      server: string
      network: string
    }
  }

  contacts: {
    pageEyebrow: string
    pageTitle: string
    sectionEyebrow: string
    sectionTitle: string
    address: string
    phone: string
    email: string
    hours: string
    labels: {
      address: string
      phone: string
      email: string
      hours: string
    }
    social: string
    mapFallback: string
    mapLink: string
  }

  footer: {
    tagline: string
    nav: string
    legal: string
    privacy: string
    terms: string
    cookies: string
    copy: string
  }

  api: {
    retry: string
    networkError: string
    networkDetail: string
    serverError: string
  }

  auth: {
    loginTitle: string
    loginSubtitle: string
    registerTitle: string
    registerSubtitle: string
    emailLabel: string
    emailPh: string
    passwordLabel: string
    passwordPh: string
    confirmPasswordLabel: string
    confirmPasswordPh: string
    nameLabel: string
    namePh: string
    phoneLabel: string
    phonePh: string
    loginSubmit: string
    registerSubmit: string
    loggingIn: string
    registering: string
    switchToRegister: string
    switchToLogin: string
    noAccount: string
    hasAccount: string
    forgotPassword: string
    orContinueAs: string
    errors: {
      required: string
      email: string
      phone: string
      passwordMin: string
      passwordMatch: string
      invalidCredentials: string
      emailTaken: string
      server: string
    }
  }

  account: {
    pageTitle: string
    pageEyebrow: string
    tabProfile: string
    tabBookings: string
    profileTitle: string
    profileSaved: string
    profileSaving: string
    profileSave: string
    nameLabel: string
    emailLabel: string
    phoneLabel: string
    memberSince: string
    bookingsTitle: string
    bookingsEmpty: string
    bookingsEmptyBody: string
    bookNow: string
    cancelBooking: string
    cancelConfirm: string
    status: {
      pending: string
      confirmed: string
      completed: string
      cancelled: string
    }
    logout: string
    loggingOut: string
  }

  nav: {
    home: string
    services: string
    masters: string
    booking: string
    contacts: string
    login: string
    account: string
  }
}
