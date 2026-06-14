import type { Translations } from "../types";

export const uk: Translations = {
  lang: "uk",
  dir: "ltr",

  hero: {
    eyebrow: "✦ Ател'є у Паризькому Стилі",
    line1: "Мистецтво",
    line2: "Прекрасного",
    line3: "Волосся",
    body: "Де паризька майстерність зустрічається з сучасним баченням. Кожен візит — це ритуал: досвід догляду, трансформації та вишуканої розкоші.",
    ctaPrimary: "Записатись",
    ctaSecondary: "Переглянути Послуги",
    stat1Value: "12+",
    stat1Label: "Років",
    stat2Value: "4",
    stat2Label: "Майстри",
    stat3Value: "3000+",
    stat3Label: "Клієнтів",
  },

  cta: {
    eyebrow: "Обмежена Кількість Місць",
    heading: "Забронюйте Місце в Ател'є",
    button: "Записатись — Це Безкоштовно",
  },

  gallery: {
    eyebrow: "Наші роботи",
    title: "Портфоліо",
    cta: "Переглянути всі послуги",
  },

  about: {
    eyebrow: "Про нас",
    title: "Prestige Studio",
    body: "Ми — команда закоханих у свою справу майстрів. Кожна деталь у нашій студії продумана для того, щоб ви відчували себе особливими. Від першої консультації до фінального результату — ми поруч.",
    cta: "Познайомитись з командою",
    features: {
      f1title: "Преміум продукти",
      f1desc: "Використовуємо лише сертифіковану косметику світових брендів",
      f2title: "Досвідчені майстри",
      f2desc: "Команда з сертифікованих фахівців з досвідом від 5 років",
      f3title: "Індивідуальний підхід",
      f3desc: "Кожен клієнт отримує персональну консультацію",
      f4title: "Гарантія якості",
      f4desc: "Безкоштовна корекція якщо результат вас не влаштував",
    },
  },

  services: {
    sectionEyebrow: "Що Ми Пропонуємо",
    sectionTitle: "Наші Послуги",
    filterAll: "Всі",
    bookCta: "Записатись на Послугу",
    offeringsEyebrow: "Наша Пропозиція",
    offeringsTitle: "Послуги та Ціни",
    offeringsBody:
      "Кожна послуга — це досвід. Ми використовуємо лише преміальні засоби та приділяємо вашому волоссю стільки часу, скільки потрібно.",
    menuEyebrow: "Повне Меню",
    menuTitle: "Деталі Послуг",
    deleteService: "Видалити цю послугу?",
    loading: "Завантаження...",
    placeHolderPhoto: "ОБРАЗ КРАСИ",
    defaultDescription:
      "Професійна послуга від наших найкращих майстрів для вашої краси та впевненості.",

    error: {
      deletingError: "Помилка при видаленні",
    },
    unit: {
      min: "хв",
      from: "від",
      cost: "UAH",
    },
    buttons: {
      deleteButton: "Видалити",
    },
  },

  masters: {
    sectionEyebrow: "Наша Команда",
    sectionTitle: "Познайомтесь з Майстрами",
    bookCta: "Записатись до Майстра",
    pageEyebrow: "Наша Команда",
    pageTitle: "Майстри",
    pageBody:
      "Кожен майстер — підготовлений митець зі своїм унікальним баченням. Разом ми охоплюємо всі аспекти догляду за волоссям.",
    yearsUnit: "р.",

    dashboard: {
      mySchedule: "Мій розклад",
      noSchedule: "У вас поки немає записів",

      scheduleStatus: {
        time: "Час",
        client: "Клієнт",
        service: "Послуга",
        status: "Статус",
      },

      errors: {
        noMasterAccount:
          "До вашого акаунту ще не прив'язано профіль майстра. Зверніться до адміністратора.",
        cantUpdateStatus: "Не вдалося оновити статус!",
      },

      status: {
        loading: "Завантаження розкладу...",
        inProgress: "В обробці",
        confirmed: "Підтверджено",
        completed: "Виконано",
        canceled: "Скасовано",
      },
    },
  },

  booking: {
    pageTitle: "Онлайн-запис",
    pageSubtitle: "Запишіться на процедуру або навчальний курс за кілька простих кроків",
    modes: {
      procedure: "Запис на процедуру",
      training: "Запис на навчання",
    },
    steps: {
      type: "Тип запису",
      contacts: "Ваші дані",
      details: "Послуга й час",
      notes: "Коментар",
    },
    fields: {
      name: "Ім'я",
      namePh: "Ваше ім'я",
      email: "Email",
      emailPh: "Ваш email",
      phone: "Телефон",
      phonePh: "+380...",
      service: "Послуга",
      selectPh: "Оберіть зі списку",
      master: "Майстер",
      masterPh: "Оберіть майстра",
      date: "Дата",
      datePh: "Оберіть дату",
      time: "Час",
      selectDateFirst: "Оберіть дату спочатку",
      notes: "Коментар до запису",
      notesPh: "Чи є у вас особливі побажання до запису?",
    },
    actions: {
      back: "Назад",
      next: "Далі",
    },
    success: {
      title: "Запис успішно створено!",
      again: "Записатись ще раз",
    },
    sending: "Надсилання...",
    submit: "Підтвердити запис",
  },

  store: {
    title: "Наш Магазин",
    eyebrow: "Професійні Засоби Догляду",
    body: "",
    emptyCart: "Ваш кошик порожній",
    backToStore: "Повернутися до магазину",
    checkout: "Оформити замовлення",
    addToCart: "В кошик",
    outOfStock: "Немає в наявності",
    details: "Деталі",
    buy: "Купити",
    volume: "Об'єм",
    availability: "Наявність",
    inStock: "В наявності",
    outOfProductCategory: "Наразі немає в наявності продуктів даної категорії",
    categories: {
      all: "Всі товари",
      shampoo: "Шампунь",
      conditioner: "Кондиціонер",
      stylingOil: "Олійка для стайлінгу",
      hairMask: "Маска для волосся",
      hairOil: "Олійка для волосся",
      hairSpray: "Лак для волосся",
      hairDye: "Фарба",
      treatment: "Догляд",
      tools: "Інструменти"
    },
    checkoutPage: {
      title: "Оформлення",
      eyebrow: "Безпечна оплата",
      body: "",
      deliveryDetails: "Деталі доставки",
      firstName: "Ім'я",
      lastName: "Прізвище",
      phone: "Номер телефону",
      deliveryMethod: "Спосіб доставки",
      pickup: "Самовивіз зі студії (Безкоштовно)",
      novaPoshta: "Доставка Новою Поштою",
      courier: "Кур'єрська доставка",
      confirmOrder: "Підтвердити замовлення",
      orderSummary: "Ваше замовлення",
      total: "Разом",
      successMessage: "Замовлення успішно оформлено! Ми скоро зв'яжемося з вами.",
      emptyError: "Ваш кошик порожній!",
      error: "Щось пішло не так. Спробуйте ще раз."
    }
  },

  contacts: {
    pageEyebrow: "Зв'яжіться з Нами",
    pageTitle: "Контакти",
    sectionEyebrow: "Де Нас Знайти",
    sectionTitle: "Відвідайте Ател'є",
    address: "вулиця Політехнічна, 6, Київ, 02000",
    phone: "+380 12 345 6789",
    email: "PrestigeStudio@gmail.com",
    hours: "Пн–Сб: 9:00 – 19:00\nНеділя: Зачинено",
    labels: {
      address: "Адреса",
      phone: "Телефон",
      email: "Пошта",
      hours: "Години роботи",
    },
    social: "Ми в соцмережах",
    mapFallback: "Інтерактивна карта тут",
    mapLink: "Відкрити в Google Maps →",
  },

  footer: {
    tagline:
      "Святилище стилю. Де кожна пасмо волосся розповідає історію майстерності та турботи.",
    nav: "Навігація",
    legal: "Правова Інформація",
    privacy: "Політика Конфіденційності",
    terms: "Умови Використання",
    cookies: "Політика Cookies",
    copy: "© 2026 Prestige Studio. Всі права захищено.",
  },

  api: {
    retry: "Спробувати знову",
    networkError: "Неможливо підключитись до сервера",
    networkDetail:
      "Переконайтесь, що C# API запущено та CORS налаштовано в Program.cs.",
    serverError: "Помилка сервера",
  },

  auth: {
    loginTitle: "Ласкаво Просимо",
    loginSubtitle: "Увійдіть, щоб керувати своїми записами",
    registerTitle: "Створити Акаунт",
    registerSubtitle:
      "Приєднайтесь до Prestige Studio та запишіться на перший прийом",
    emailLabel: "Електронна пошта",
    emailPh: "ваша@пошта.com",
    passwordLabel: "Пароль",
    passwordPh: "••••••••",
    confirmPasswordLabel: "Підтвердіть пароль",
    confirmPasswordPh: "••••••••",
    nameLabel: "Повне ім'я",
    namePh: "Ваше ім'я",
    phoneLabel: "Телефон",
    phonePh: "+380 00 000 00 00",
    loginSubmit: "Увійти",
    registerSubmit: "Створити Акаунт",
    loggingIn: "Вхід…",
    registering: "Створення акаунту…",
    switchToRegister: "Створити акаунт",
    switchToLogin: "Увійти",
    noAccount: "Немає акаунту?",
    hasAccount: "Вже є акаунт?",
    forgotPassword: "Забули пароль?",
    orContinueAs: "або продовжити як гість",

    forgotPassw: {
      resetTitle: "Відновлення паролю",
      resetSubtitle: "Введіть email і ми надішлемо інструкції",
      resetButton: "Надіслати інструкції",
      remembTitle: "Згадали пароль?",
      returnButton: "Повернутись",
      instrtuctionsTitle: "Лист з інструкціями надіслано на",
      instrtuctionsSubtitle: "Перевірте папку «Спам» якщо не бачите листа.",
      exit: "← Повернутись до входу",

      status: {
        sending: "Надсилаємо...",
      },
    },

    errors: {
      required: "Це поле обов'язкове",
      email: "Неправильна адреса пошти",
      phone: "Неправильний номер телефону",
      passwordMin: "Пароль має містити щонайменше 8 символів",
      passwordMatch: "Паролі не збігаються",
      invalidCredentials: "Невірна пошта або пароль",
      emailTaken: "Ця пошта вже зареєстрована",
      server: "Щось пішло не так. Будь ласка, спробуйте знову.",
    },
  },

  security: {
    title: "Налаштування безпеки",
    passwordNotMatch: "Паролі не співпадають",
    passwordChanged: "Пароль успішно змінено!",
    oldPasswordIncorect: "Старий пароль невірний",
    buttons: {
      oldPassword: "Поточний пароль",
      newPassword: "Новий пароль",
      confirmPassword: "Підтвердіть новий пароль",
      updatePassword: "Оновити пароль",
    },
    status: {
      Updating: "Оновлення...",
    },
  },

  account: {
    pageTitle: "Мій Акаунт",
    pageEyebrow: "Особистий Кабінет",
    tabProfile: "Профіль",
    tabBookings: "Мої Записи",
    tabSecurity: "БЕЗПЕКА",
    profileTitle: "Особиста Інформація",
    profileSaved: "Зміни збережено",
    profileSaving: "Збереження…",
    profileSave: "Зберегти",
    nameLabel: "Повне ім'я",
    emailLabel: "Електронна пошта",
    phoneLabel: "Телефон",
    memberSince: "Клієнт з",
    bookingsTitle: "Історія Записів",
    bookingsEmpty: "Записів поки немає",
    bookingsEmptyBody: "Ваша історія з'явиться тут після першого запису.",
    bookNow: "Записатись",
    cancelBooking: "Скасувати",
    cancelConfirm: "Ви впевнені, що хочете скасувати цей запис?",
    completedNote: "Дякуємо, що обрали нас!",
    status: {
      pending: "Очікує",
      confirmed: "Підтверджено",
      completed: "Завершено",
      cancelled: "Скасовано",
      in_progress: "У процесі",
      scheduled: "Заплановано",
    },
    adminButton: "⚙️ Адмін-панель",
    masterButton: "📅 Мій розклад",
    logout: "Вийти",
    loggingOut: "Вихід…",
  },

  admin: {
    title: "Панель Адміністратора: Всі записи",
    columns: {
      dateTime: "Дата / Час",
      client: "Клієнт",
      service: "Послуга / Майстер",
      price: "Ціна",
      notes: "Примітки",
      status: "Керування статусом",
    },
    empty: "Записів ще немає.",
    statusOptions: {
      IN_PROGRESS: "В обробці",
      CONFIRMED: "Підтверджено",
      COMPLETED: "Виконано",
      CANCELLED: "Скасовано",
    },

    tabs: {
      bookings: "Записи",
      users: "Користувачі",
      masters: "Майстри",
      service: "Послуги",
    },
    usersColumns: {
      name: "Ім'я / Телефон",
      email: "Email",
      registered: "Реєстрація",
      role: "Роль (Доступ)",
      actions: "Дії",
      client: "Клієнт",
      admin: "Адмін",
      master: "Майстер",
    },
    roles: {
      Client: "Клієнт",
      Master: "Майстер",
      Admin: "Адміністратор",
    },
    masters: {
      addBtn: "Додати нового майстра",
      closeBtn: "✕ Закрити",
      formTitle: "",
      saveBtn: "Зберегти майстра",
      uploading: "",
      namePh: "ПІБ майстра",
      phonePh: "Телефон",
      mailPh: "Email",
      passwPh: "Пароль",
      expPh: "Досвід",
      specs: "Спеціалізація",
      photo: "ФОТО МАЙСТРА",

      hintPhoto:
        "Рекомендований розмір: 600x800 пікселів (співвідношення сторін 3:4), формат JPG або PNG",

      gender: {
        woman: "Жінка",
        man: "Чоловік",
        other: "Не вказано",
      },

      exprank: {
        junior: "Junior",
        middle: "Middle",
        senior: "Senior",
        top: "Top",
      },
    },

    services: {
      manageService: "Керування послугами",
      addBtn: "Додати нову послугу",
      closeBtn: "✕ Закрити",
      saveBtn: "Зберегти послугу",
      namePh: "Назва послуги",
      category: "Категорія",
      description: "Опис послуги",
      durationPh: "Тривалість (хв)",
      costPh: "Ціна (грн)",
      descServicePh: "",
      photo: "ФОТО ПОСЛУГИ",
      hintPhoto: "Рекомендований розмір: 800x600 px (4:3), формат JPG або PNG",

      type: {
        option1: "Фарбування ",
        option2: "Стрижка",
        option3: "Нарощування",
        option4: "Укладка",
        option5: "Завивка",
        option6: "Догляд",
        option7: "Колорування",
      },
    },

    dashboard: {
      imageUploadError: "Помилка AWS S3",
      confirmMessageDeleteMaster:
        "Ви впевнені, що хочете видалити цього майстра?",
      confirmMessageDeleteService:
        "Ви впевнені, що хочете видалити цю послугу?",
      deleteCLientFromBase: "Видалити цього користувача з бази?",
      serviceCreated: "Послугу створено!",
      selectProfile: "Оберіть профіль",

      errors: {
        errorEmptySlots:
          "Будь ласка, заповніть ім'я, email, пароль та завантажте фото",
        errorFailedUpload:
          "Помилка при збереженні. Перевірте, чи не зайнятий Email.",
        errorDeleteMaster: "Помилка при видаленні майстра",
        errorDeleteService: "Помилка під час видалення служби",
        cantUpdateStatus: "Не вдалося оновити статус!",
        cantUpdateRole: "Не вдалося змінити роль!",
        errorDelete: "Помилка видалення! Перевір бекенд.",
        errorUploadingToS3: "Помилка AWS S3 при завантаженні фото послуги",
        errorEmptyField: "Додайте назву та фото послуги",
        errorSaving: "Помилка при збереженні",
      },
      success: {
        masterIsCreated: "Майстра успішно створено!",
        masterIsUpdated: "Дані майстра оновлено!",
        serviceIsUpdated: "Послугу оновлено!",
        removedCompletely: "Видалено повністю!",
      },
      status: {
        loading: "Завантаження даних...",
        loadingS3: "Завантаження на S3...",
      },

      buttons: {
        deleteButtons: "Видалити",
      },
    },
  },

  nav: {
    home: "Головна",
    services: "Послуги",
    masters: "Майстри",
    store: "Store",
    booking: "Записатись",
    contacts: "Контакти",
    login: "Увійти",
    account: "Мій Акаунт",
  },
};
