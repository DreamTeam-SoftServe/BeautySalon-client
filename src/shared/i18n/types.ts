export type Locale = "en" | "uk";

export interface Translations {
  lang: Locale;
  dir: "ltr" | "rtl";

  hero: {
    eyebrow: string;
    line1: string;
    line2: string;
    line3: string;
    body: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stat1Value: string;
    stat1Label: string;
    stat2Value: string;
    stat2Label: string;
    stat3Value: string;
    stat3Label: string;
  };

  cta: {
    eyebrow: string;
    heading: string;
    button: string;
  };

  gallery: {
    eyebrow: string;
    title: string;
    cta: string;
  };

  about: {
    eyebrow: string;
    title: string;
    body: string;
    cta: string;
    features: {
      f1title: string;
      f1desc: string;
      f2title: string;
      f2desc: string;
      f3title: string;
      f3desc: string;
      f4title: string;
      f4desc: string;
    };
  };

  services: {
    sectionEyebrow: string;
    sectionTitle: string;
    filterAll: string;
    bookCta: string;
    offeringsEyebrow: string;
    offeringsTitle: string;
    offeringsBody: string;
    menuEyebrow: string;
    menuTitle: string;
    deleteService: string;
    loading: string;
    placeHolderPhoto: string;
    defaultDescription: string;

    error: {
      deletingError: string;
    };

    unit: {
      min: string;
      from: string;
      cost: string;
    };

    buttons: {
      deleteButton: string;
    };
  };

  masters: {
    sectionEyebrow: string;
    sectionTitle: string;
    bookCta: string;
    pageEyebrow: string;
    pageTitle: string;
    pageBody: string;
    yearsUnit: string;

    dashboard: {
      mySchedule: string;
      noSchedule: string;

      scheduleStatus: {
        time: string;
        client: string;
        service: string;
        status: string;
      };

      errors: {
        noMasterAccount: string;
        cantUpdateStatus: string;
      };

      status: {
        loading: string;
        inProgress: string;
        confirmed: string;
        completed: string;
        canceled: string;
      };
    };
  };

  booking: {
    pageEyebrow: string;
    pageTitle: string;
    pageBody: string;
    fields: {
      name: string;
      email: string;
      phone: string;
      service: string;
      master: string;
      date: string;
      time: string;
      notes: string;
      masterPh: string;
      namePh: string;
      emailPh: string;
      phonePh: string;
      notesPh: string;
      selectPh: string;
      datePh: string;
    };
    submit: string;
    sending: string;
    success: {
      title: string;
      cancelled: string;
      reference: string;
      body: string;
      again: string;
    };
    errors: {
      required: string;
      email: string;
      phone: string;
      service: string;
      date: string;
      time: string;
      slot: string;
      session: string;
      server: string;
      network: string;
    };
  };

  contacts: {
    pageEyebrow: string;
    pageTitle: string;
    sectionEyebrow: string;
    sectionTitle: string;
    address: string;
    phone: string;
    email: string;
    hours: string;
    labels: {
      address: string;
      phone: string;
      email: string;
      hours: string;
    };
    social: string;
    mapFallback: string;
    mapLink: string;
  };

  footer: {
    tagline: string;
    nav: string;
    legal: string;
    privacy: string;
    terms: string;
    cookies: string;
    copy: string;
  };

  api: {
    retry: string;
    networkError: string;
    networkDetail: string;
    serverError: string;
  };

  auth: {
    loginTitle: string;
    loginSubtitle: string;
    registerTitle: string;
    registerSubtitle: string;
    emailLabel: string;
    emailPh: string;
    passwordLabel: string;
    passwordPh: string;
    confirmPasswordLabel: string;
    confirmPasswordPh: string;
    nameLabel: string;
    namePh: string;
    phoneLabel: string;
    phonePh: string;
    loginSubmit: string;
    registerSubmit: string;
    loggingIn: string;
    registering: string;
    switchToRegister: string;
    switchToLogin: string;
    noAccount: string;
    hasAccount: string;
    forgotPassword: string;
    orContinueAs: string;

    forgotPassw: {
      resetTitle: string;
      resetSubtitle: string;
      resetButton: string;
      remembTitle: string;
      returnButton: string;
      instrtuctionsTitle: string;
      instrtuctionsSubtitle: string;
      exit: string;

      status: {
        sending: string;
      };
    };

    errors: {
      required: string;
      email: string;
      phone: string;
      passwordMin: string;
      passwordMatch: string;
      invalidCredentials: string;
      emailTaken: string;
      server: string;
    };
  };

  security: {
    title: string;
    passwordNotMatch: string;
    passwordChanged: string;
    oldPasswordIncorect: string;
    buttons: {
      oldPassword: string;
      newPassword: string;
      confirmPassword: string;
      updatePassword: string;
    };

    status: {
      Updating: string;
    };
  };

  account: {
    pageTitle: string;
    pageEyebrow: string;
    tabProfile: string;
    tabBookings: string;
    tabSecurity: string;
    profileTitle: string;
    profileSaved: string;
    profileSaving: string;
    profileSave: string;
    nameLabel: string;
    emailLabel: string;
    phoneLabel: string;
    memberSince: string;
    bookingsTitle: string;
    bookingsEmpty: string;
    bookingsEmptyBody: string;
    bookNow: string;
    cancelBooking: string;
    cancelConfirm: string;
    completedNote: string;
    status: {
      pending: string;
      confirmed: string;
      completed: string;
      cancelled: string;
      in_progress: string;
      scheduled: string;
    };
    adminButton: string;
    masterButton: string;
    logout: string;
    loggingOut: string;
  };

  admin: {
    title: string;
    columns: {
      dateTime: string;
      client: string;
      service: string;
      price: string;
      notes: string;
      status: string;
    };
    empty: string;
    statusOptions: {
      IN_PROGRESS: string;
      CONFIRMED: string;
      COMPLETED: string;
      CANCELLED: string;
    };
    tabs: {
      bookings: string;
      users: string;
      masters: string;
      service: string;
    };

    usersColumns: {
      name: string;
      email: string;
      registered: string;
      role: string;
      actions: string;
      client: string;
      master: string;
      admin: string;
    };

    roles: {
      Client: string;
      Master: string;
      Admin: string;
    };

    masters: {
      addBtn: string;
      closeBtn: string;
      formTitle: string;
      saveBtn: string;
      uploading: string;
      namePh: string;
      phonePh: string;
      mailPh: string;
      passwPh: string;
      expPh: string;
      specs: string;
      photo: string;
      hintPhoto: string;

      gender: {
        woman: string;
        man: string;
        other: string;
      };

      exprank: {
        junior: string;
        middle: string;
        senior: string;
        top: string;
      };
    };

    services: {
      manageService: string;
      addBtn: string;
      closeBtn: string;
      saveBtn: string;
      namePh: string;
      durationPh: string;
      category: string;
      description: string;
      costPh: string;
      descServicePh: string;
      photo: string;
      hintPhoto: string;

      type: {
        option1: string;
        option2: string;
        option3: string;
        option4: string;
        option5: string;
        option6: string;
        option7: string;
      };
    };

    dashboard: {
      imageUploadError: string;
      confirmMessageDeleteMaster: string;
      confirmMessageDeleteService: string;
      deleteCLientFromBase: string;
      serviceCreated: string;
      selectProfile: string;
      errors: {
        errorEmptySlots: string;
        errorFailedUpload: string;
        errorDeleteMaster: string;
        errorDeleteService: string;
        cantUpdateStatus: string;
        cantUpdateRole: string;
        errorDelete: string;
        errorUploadingToS3: string;
        errorEmptyField: string;
        errorSaving: string;
      };
      success: {
        masterIsCreated: string;
        masterIsUpdated: string;
        serviceIsUpdated: string;
        removedCompletely: string;
      };

      status: {
        loading: string;
        loadingS3: string;
      };

      buttons: {
        deleteButtons: string;
      };
    };
  };

  nav: {
    home: string;
    services: string;
    masters: string;
    booking: string;
    contacts: string;
    login: string;
    account: string;
  };
}
