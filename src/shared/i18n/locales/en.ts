import type { Translations } from "../types";

export const en: Translations = {
  lang: "en",
  dir: "ltr",

  hero: {
    eyebrow: "✦ Paris-Inspired Hair Atelier",
    line1: "The Art",
    line2: "of Beautiful",
    line3: "Hair",
    body: "Where Parisian craft meets modern vision. Each visit is a ritual — an experience of care, transformation, and quiet luxury.",
    ctaPrimary: "Book Appointment",
    ctaSecondary: "Explore Services",
    stat1Value: "12+",
    stat1Label: "Years",
    stat2Value: "4",
    stat2Label: "Masters",
    stat3Value: "3000+",
    stat3Label: "Clients",
  },

  cta: {
    eyebrow: "Limited Availability",
    heading: "Reserve Your Seat at the Atelier",
    button: "Book Now — It's Free",
  },

  gallery: {
  eyebrow: "Our Work",
  title: "Portfolio",
  cta: "View All Services",
},

about: {
  eyebrow: "About Us",
  title: "Prestige Studio",
  body: "We are a team of passionate masters. Every detail in our studio is designed to make you feel special. From the first consultation to the final result — we are with you.",
  cta: "Meet the Team",
  features: {
    f1title: "Premium Products",
    f1desc: "We use only certified cosmetics from world brands",
    f2title: "Experienced Masters",
    f2desc: "Certified specialists with 5+ years of experience",
    f3title: "Personal Approach",
    f3desc: "Every client receives a personal consultation",
    f4title: "Quality Guarantee",
    f4desc: "Free correction if you are not satisfied with the result",
  },
},

  services: {
    sectionEyebrow: "What We Offer",
    sectionTitle: "Our Services",
    filterAll: "All",
    bookCta: "Book a Service",
    offeringsEyebrow: "Our Offerings",
    offeringsTitle: "Services & Pricing",
    offeringsBody:
      "Every service is an experience. We use only premium products and take the time your hair deserves.",
    menuEyebrow: "Complete Menu",
    menuTitle: "Service Details",
    deleteService: "Delete this service?",
    placeHolderPhoto: "BEAUTY IMAGE",
    loading: "Loading...",
    defaultDescription:
      "Professional service from our best masters for your beauty and confidence.",

    error: {
      deletingError: "Error during deletion",
    },

    unit: {
      min: "Min",
      from: "From",
      cost: "UAH",
    },

    buttons: {
      deleteButton: "Delete",
    },
  },

  masters: {
    sectionEyebrow: "Our Team",
    sectionTitle: "Meet the Masters",
    bookCta: "Book with a Master",
    pageEyebrow: "Our Team",
    pageTitle: "The Masters",
    pageBody:
      "Each master is a trained artisan with a unique perspective. Together, we cover every aspect of hair care.",
    yearsUnit: "yrs",

    dashboard: {
      mySchedule: "My schedule",
      noSchedule: "You don't have any entries yet",

      scheduleStatus: {
        time: "Time",
        client: "Client",
        service: "Service",
        status: "Status",
      },

      errors: {
        noMasterAccount:
          "No master profile has been linked to your account yet. Please contact your administrator.",
        cantUpdateStatus: "Failed to update status!",
      },

      status: {
        loading: "Loading schedule...",
        inProgress: "In processing",
        confirmed: "Confirmed",
        completed: "Complete",
        canceled: "Canceled",
      },
    },
  },

  booking: {
    pageEyebrow: "Reserve Your Visit",
    pageTitle: "Book an Appointment",
    pageBody:
      "Fill out the form below. Our team will confirm your registration within 2 hours.",
    fields: {
      name: "Full Name",
      email: "Email",
      phone: "Phone",
      service: "Service",
      master: "Preferred Master",
      date: "Preferred Date",
      time: "Preferred Time",
      notes: "Notes (optional)",
      masterPh: "Any master",
      namePh: "Your name",
      emailPh: "your@email.com",
      phonePh: "+380 00 000 00 00",
      notesPh: "Allergies, special requests…",
      selectPh: "Select an option",
      datePh: "DD.MM.YYYY",
    },
    submit: "Reserve Appointment",
    sending: "Sending…",
    success: {
      title: "Appointment Confirmed",
      cancelled: "Your booking has been successfully cancelled",
      reference: "Reference",
      body: "We've received your booking and will reach out within 2 hours to confirm.",
      again: "Book Another",
    },
    errors: {
      required: "This field is required",
      email: "Invalid email address",
      phone: "Invalid phone number",
      service: "Please select a service",
      date: "Please pick a date",
      time: "Please pick a time",
      slot: "This time slot is no longer available. Please choose another.",
      session: "Session expired. Please log in again.",
      server: "An error occurred. Please try again.",
      network: "Cannot connect to server. Verify CORS and VITE_API_BASE_URL.",
    },
  },

  contacts: {
    pageEyebrow: "Get in Touch",
    pageTitle: "Contact Us",
    sectionEyebrow: "Find Us",
    sectionTitle: "Visit the Atelier",
    address: "6 Polytechnichna Street, Kyiv, 02000",
    phone: "+380 12 345 6789",
    email: "PrestigeStudio@gmail.com",
    hours: "Mon–Sat: 9:00 – 19:00\nSunday: Closed",
    labels: {
      address: "Address",
      phone: "Phone",
      email: "Email",
      hours: "Hours",
    },
    social: "Follow Us",
    mapFallback: "Interactive map goes here",
    mapLink: "Open in Google Maps →",
  },

  footer: {
    tagline:
      "A sanctuary of style. Where every strand tells a story of craft and care.",
    nav: "Navigation",
    legal: "Legal",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    cookies: "Cookie Policy",
    copy: "© 2026 Prestige Studio. All rights reserved.",
  },

  api: {
    retry: "Retry",
    networkError: "Cannot connect to server",
    networkDetail:
      "Ensure the C# API is running and CORS is configured in Program.cs. Check VITE_API_BASE_URL.",
    serverError: "Server error",
  },

  auth: {
    loginTitle: "Welcome Back",
    loginSubtitle: "Sign in to manage your appointments",
    registerTitle: "Create Account",
    registerSubtitle: "Join Prestige Studio and book your first appointment",
    emailLabel: "Email",
    emailPh: "your@email.com",
    passwordLabel: "Password",
    passwordPh: "••••••••",
    confirmPasswordLabel: "Confirm Password",
    confirmPasswordPh: "••••••••",
    nameLabel: "Full Name",
    namePh: "Your name",
    phoneLabel: "Phone",
    phonePh: "+1 (555) 000-0000",
    loginSubmit: "Sign In",
    registerSubmit: "Create Account",
    loggingIn: "Signing in…",
    registering: "Creating account…",
    switchToRegister: "Create an account",
    switchToLogin: "Sign in instead",
    noAccount: "Don't have an account?",
    hasAccount: "Already have an account?",
    forgotPassword: "Forgot password?",
    orContinueAs: "or continue as guest",
    errors: {
      required: "This field is required",
      email: "Invalid email address",
      phone: "Invalid phone number",
      passwordMin: "Password must be at least 8 characters",
      passwordMatch: "Passwords do not match",
      invalidCredentials: "Invalid email or password",
      emailTaken: "This email is already registered",
      server: "Something went wrong. Please try again.",
    },
  },

  security: {
    title: "Security settings",
    passwordNotMatch: "Passwords do not match",
    passwordChanged: "Password successfully changed!",
    oldPasswordIncorect: "Old password is incorrect",
    buttons: {
      oldPassword: "Current password",
      newPassword: "New password",
      confirmPassword: "Confirm your new password",
      updatePassword: "Update password",
    },
    status: {
      Updating: "Updates...",
    },
  },

  account: {
    pageTitle: "My Account",
    pageEyebrow: "Personal Area",
    tabProfile: "Profile",
    tabBookings: "My Bookings",
    tabSecurity: "SAFETY",
    profileTitle: "Personal Information",
    profileSaved: "Changes saved",
    profileSaving: "Saving…",
    profileSave: "Save Changes",
    nameLabel: "Full Name",
    emailLabel: "Email",
    phoneLabel: "Phone",
    memberSince: "Member since",
    bookingsTitle: "Appointment History",
    bookingsEmpty: "No appointments yet",
    bookingsEmptyBody:
      "Your booking history will appear here after your first appointment.",
    bookNow: "Book an Appointment",
    cancelBooking: "Cancel",
    cancelConfirm: "Are you sure you want to cancel this appointment?",
    completedNote: "Thank you for choosing us!",
    status: {
      pending: "Pending",
      confirmed: "Confirmed",
      completed: "Completed",
      cancelled: "Cancelled",
      in_progress: "In progress",
      scheduled: "Planned",
    },
    adminButton: "⚙️ Administration panel",
    masterButton: "📅 My schedule",
    logout: "Sign Out",
    loggingOut: "Signing out…",
  },

  nav: {
    home: "Home",
    services: "Services",
    masters: "Masters",
    booking: "Book Now",
    contacts: "Contact",
    login: "Sign In",
    account: "My Account",
  },

  admin: {
    title: "Admin Dashboard",
    columns: {
      dateTime: "Date / Time",
      client: "Client",
      service: "Service / Master",
      price: "Price",
      notes: "Notes",
      status: "Manage Status",
    },
    empty: "No bookings yet.",
    statusOptions: {
      IN_PROGRESS: "In Progress",
      CONFIRMED: "Confirmed",
      COMPLETED: "Completed",
      CANCELLED: "Cancelled",
    },
    tabs: {
      bookings: "Appointments",
      users: "User Access",
      masters: "Our Team",
      service: "Services",
    },
    usersColumns: {
      name: "Name",
      email: "Email",
      registered: "Registered",
      role: "Role",
      actions: "Actions",
      client: "Client",
      admin: "Admin",
      master: "Master",
    },
    roles: {
      Client: "Client",
      Master: "Master",
      Admin: "Administrator",
    },
    masters: {
      addBtn: "Add new master",
      closeBtn: "✕ Close",
      formTitle: "",
      saveBtn: "Save master",
      uploading: "",
      namePh: "Master's full name",
      phonePh: "Phone",
      mailPh: "Email",
      passwPh: "Password",
      expPh: "Experience",
      specs: "Specialization",
      photo: "MASTER'S PHOTO",

      hintPhoto:
        "Recommended size: 600x800 pixels (aspect ratio 3:4), JPG or PNG format",

      gender: {
        woman: "Woman",
        man: "Man",
        other: "Other",
      },

      exprank: {
        junior: "Junior",
        middle: "Middle",
        senior: "Senior",
        top: "Top",
      },
    },

    dashboard: {
      imageUploadError: "AWS S3 error",
      confirmMessageDeleteMaster:
        "Are you sure you want to delete this master?",
      confirmMessageDeleteService:
        "Are you sure you want to delete this service?",
      deleteCLientFromBase: "Remove this user from the database?",
      serviceCreated: "Service created!",
      selectProfile: "Select a profile",

      errors: {
        errorEmptySlots:
          "Please fill in your name, email, password, and upload a photo.",
        errorFailedUpload: "Error saving. Check if your email is busy.",
        errorDeleteMaster: "Error when deleting the wizard",
        errorDeleteService: "Error during service removal",
        cantUpdateStatus: "Failed to update status!",
        cantUpdateRole: "Failed to change role!",
        errorDelete: "Deletion error! Check the backend.",
        errorUploadingToS3: "AWS S3 error when uploading photos to the service",
        errorEmptyField: "Add the name and photo of the service",
        errorSaving: "Error saving",
      },
      success: {
        masterIsCreated: "The master has been successfully created!",
        masterIsUpdated: "Master data updated!",
        removedCompletely: "Completely deleted!",
        serviceIsUpdated: "The service has been updated!",

      },
      status: {
        loading: "Loading data...",
        loadingS3: "Uploading to S3...",
      },

      buttons: {
        deleteButtons: "Delete",
      },
    },
    services: {
      manageService: "Service management",
      addBtn: "Add a new service",
      closeBtn: "✕ Close",
      saveBtn: "Save service",
      namePh: "Service name",
      durationPh: "Duration (min)",
      category: "Category",
      description: "Service description",
      costPh: "Price (UAH)",
      descServicePh: "",
      photo: "PHOTO SERVICES",
      hintPhoto: "Recommended size: 800x600 px (4:3), JPG or PNG format",
      type: {
        option1: "Coloring",
        option2: "Haircut",
        option3: "Extensions",
        option4: "Styling",
        option5: "Perm",
        option6: "Care",
        option7: "Coloring",
      },
    },
  },
};
