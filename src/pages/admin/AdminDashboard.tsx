import { useEffect, useState } from "react";
import { api, type Master, type Service } from "../../shared/api/api";
import { THEME } from "../../shared/config/theme";
import { useI18n } from "../../shared/i18n";
import { serviceTypeMap } from "../../widgets/ServicesSection";

type TabType = "bookings" | "users" | "masters" | "services";

export function AdminDashboard() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<TabType>("bookings");

  const [bookings, setBookings] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [mastersList, setMastersList] = useState<Master[]>([]);
  const [loading, setLoading] = useState(true);

  const [isAddingMaster, setIsAddingMaster] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [newMaster, setNewMaster] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    gender: 1,
    pricePersent: 40,
    specialization: 1,
    profLevel: 0,
    experience: "",
    imageUrl: "",
  });

  const [servicesList, setServicesList] = useState<any[]>([]);
  const [isAddingService, setIsAddingService] = useState(false);
  const [newService, setNewService] = useState({
    title: "",
    description: "",
    price: 0,
    duration: 60,
    serviceType: 1,
    imageUrl: "",
  });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === "bookings") {
        const res = await api.getAdminBookings();
        setBookings(Array.isArray(res) ? res : (res as any).data || []);
      } else if (activeTab === "users" || activeTab === "masters") {
        const [uRes, mRes] = await Promise.all([
          api.getAllUsers(),
          api.getMasters(),
        ]);
        setUsers(Array.isArray(uRes) ? uRes : (uRes as any).data || []);
        const mastersData = Array.isArray(mRes)
          ? mRes
          : (mRes as any).data || [];
        setMastersList(mastersData);
      } else if (activeTab === "services") {
        const res = await api.getServices();
        setServicesList(Array.isArray(res) ? res : (res as any).data || []);
      }
    } catch (error) {
      console.error("Data loading error", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const localPreview = URL.createObjectURL(file);
    setNewMaster((prev) => ({ ...prev, imageUrl: localPreview }));

    setUploading(true);
    try {
      const res = await api.uploadImage(file, "masters");
      const uploadedUrl = (res as any).url || (res as any).data?.url;

      if (uploadedUrl) {
        setNewMaster((prev) => ({ ...prev, imageUrl: uploadedUrl }));
      }
    } catch (err) {
      console.error("Error loading into S3:", err);
      alert(t.admin.dashboard.imageUploadError);
      setNewMaster((prev) => ({ ...prev, imageUrl: "" }));
    } finally {
      setUploading(false);
    }
  };

  const handleSaveMaster = async () => {
    if (
      !newMaster.name ||
      !newMaster.imageUrl ||
      !newMaster.email ||
      !newMaster.password
    ) {
      alert(t.admin.dashboard.errors.errorEmptySlots);
      return;
    }

    try {
      const payload = {
        name: newMaster.name,
        phone: newMaster.phone,
        experience: newMaster.experience,
        profLevel: Number(newMaster.profLevel),
        specialization: Number(newMaster.specialization),
        gender: Number(newMaster.gender),
        pricePersent: Number(newMaster.pricePersent),
        imageUrl: newMaster.imageUrl,
        email: newMaster.email,
        password: newMaster.password,
      };

      await api.createMaster(payload);

      alert(t.admin.dashboard.success.masterIsCreated);
      setIsAddingMaster(false);

      setNewMaster({
        name: "",
        phone: "",
        email: "",
        password: "",
        experience: "",
        gender: 1,
        pricePersent: 40,
        specialization: 1,
        profLevel: 0,
        imageUrl: "",
      });

      fetchData();
    } catch (error) {
      alert(t.admin.dashboard.errors.errorFailedUpload);
      console.error(error);
    }
  };

  const handleDeleteMaster = async (masterId: string) => {
    if (!window.confirm(t.admin.dashboard.confirmMessageDeleteMaster)) return;
    try {
      await api.deleteMaster(masterId);
      setMastersList((prev) => prev.filter((m) => m.id !== masterId));
    } catch (error) {
      alert(t.admin.dashboard.errors.errorDeleteMaster);
    }
  };

  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    try {
      await api.updateBookingStatus(bookingId, newStatus);
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b)),
      );
    } catch (error) {
      alert(t.admin.dashboard.errors.cantUpdateStatus);
    }
  };

  const handleRoleChange = async (
    userId: string,
    newRole: string,
    masterProfileId?: string,
  ) => {
    try {
      await api.updateUserRole(userId, newRole, masterProfileId);
      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, role: newRole, masterProfileId } : u,
        ),
      );
    } catch (error) {
      alert(t.admin.dashboard.errors.cantUpdateRole);
    }
  };

  const handleDeleteUser = async (userId: string, masterProfileId?: string) => {
    if (!window.confirm(t.admin.dashboard.deleteCLientFromBase)) return;

    try {
      await api.deleteUser(userId);
      setUsers((prev) => prev.filter((u) => u.id !== userId));

      if (masterProfileId) {
        await api.deleteMaster(masterProfileId);
        setMastersList((prev) => prev.filter((m) => m.id !== masterProfileId));
      }

      alert(t.admin.dashboard.success.removedCompletely);
    } catch (error) {
      alert(t.admin.dashboard.errors.errorDelete);
      console.error(error);
    }
  };

  const handleServiceImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const localPreview = URL.createObjectURL(file);
    setNewService((prev) => ({ ...prev, imageUrl: localPreview }));

    setUploading(true);
    try {
      const res = await api.uploadImage(file, "services");
      const url = (res as any).url || (res as any).data?.url;
      if (url) setNewService((prev) => ({ ...prev, imageUrl: url }));
    } catch (err) {
      alert(t.admin.dashboard.errors.errorUploadingToS3);
      setNewService((prev) => ({ ...prev, imageUrl: "" }));
    } finally {
      setUploading(false);
    }
  };

  const handleSaveService = async () => {
    if (!newService.title || !newService.imageUrl) {
      alert(t.admin.dashboard.errors.errorEmptyField);
      return;
    }
    try {
      const payload: Omit<Service, "id"> = {
        title: newService.title,
        description: newService.description || "",
        servicePrice: newService.price,
        duration: Number(newService.duration),
        serviceType: Number(newService.serviceType),
        imageUrl: newService.imageUrl,
      };

      await api.createService(payload);
      alert(t.admin.dashboard.serviceCreated);
      setIsAddingService(false);

      setNewService({
        title: "",
        description: "",
        duration: 60,
        price: 0,
        serviceType: 1,
        imageUrl: "",
      });

      fetchData();
    } catch (error) {
      alert(t.admin.dashboard.errors.errorSaving);
    }
  };

  const handleDeleteService = async (serviceId: string) => {
    if (!window.confirm(t.admin.dashboard.confirmMessageDeleteService)) return;
    try {
      await api.deleteService(serviceId);
      setServicesList((prev) => prev.filter((s) => s.id !== serviceId));
    } catch (error) {
      alert(t.admin.dashboard.errors.errorDeleteService);
    }
  };

  const getTabBtnStyle = (tab: TabType) => ({
    padding: "12px 24px",
    background: activeTab === tab ? THEME.colors.charcoal : THEME.colors.white,
    color: activeTab === tab ? THEME.colors.white : THEME.colors.charcoal,
    border: `1px solid ${THEME.colors.charcoal}`,
    borderRadius: "4px",
    cursor: "pointer",
    fontFamily: THEME.fonts.sans,
    fontSize: "0.85rem",
    letterSpacing: "0.05em",
    textTransform: "uppercase" as const,
    transition: "all 0.2s",
  });

  const tableHeaderStyle = {
    background: "#F8F5F0",
    borderBottom: `2px solid #E8E0D0`,
    padding: "16px",
    color: THEME.colors.muted,
    fontSize: "0.8rem",
    textTransform: "uppercase" as const,
    letterSpacing: "0.1em",
  };

  return (
    <div
      style={{
        padding: "80px 5% 40px",
        maxWidth: "1200px",
        margin: "0 auto",
        minHeight: "80vh",
      }}
    >
      <h2
        style={{
          fontFamily: THEME.fonts.display,
          color: THEME.colors.charcoal,
          marginBottom: "32px",
          fontSize: "2.4rem",
        }}
      >
        {t.admin.title}
      </h2>

      <div style={{ display: "flex", gap: "12px", marginBottom: "40px" }}>
        <button
          onClick={() => setActiveTab("bookings")}
          style={getTabBtnStyle("bookings")}
        >
          {t.admin.tabs?.bookings}
        </button>
        <button
          onClick={() => setActiveTab("users")}
          style={getTabBtnStyle("users")}
        >
          {t.admin.tabs?.users}
        </button>
        <button
          onClick={() => setActiveTab("masters")}
          style={getTabBtnStyle("masters")}
        >
          {t.admin.tabs?.masters}
        </button>
        <button
          onClick={() => setActiveTab("services")}
          style={getTabBtnStyle("services")}
        >
          {t.admin.tabs.service}
        </button>
      </div>

      {loading ? (
        <div
          style={{
            textAlign: "center",
            padding: "100px",
            color: THEME.colors.muted,
            fontFamily: THEME.fonts.body,
          }}
        >
          {t.admin.dashboard.status.loading}
        </div>
      ) : (
        <>
          {/* ВКЛАДКА ЗАПИСІВ */}
          {activeTab === "bookings" && (
            <div
              style={{
                overflowX: "auto",
                background: THEME.colors.white,
                border: "1px solid #E8E0D0",
                borderRadius: "8px",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  textAlign: "left",
                }}
              >
                <thead>
                  <tr>
                    <th style={tableHeaderStyle}>{t.admin.columns.dateTime}</th>
                    <th style={tableHeaderStyle}>{t.admin.columns.client}</th>
                    <th style={tableHeaderStyle}>{t.admin.columns.service}</th>
                    <th style={tableHeaderStyle}>{t.admin.columns.price}</th>
                    <th style={tableHeaderStyle}>{t.admin.columns.status}</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr
                      key={b.id}
                      style={{ borderBottom: "1px solid #E8E0D0" }}
                    >
                      <td style={{ padding: "16px" }}>
                        <div style={{ fontWeight: 500 }}>{b.date}</div>
                        <div style={{ color: THEME.colors.gold }}>{b.time}</div>
                      </td>
                      <td style={{ padding: "16px" }}>
                        <div style={{ fontWeight: 500 }}>{b.clientName}</div>
                        <div
                          style={{
                            fontSize: "0.85rem",
                            color: THEME.colors.muted,
                          }}
                        >
                          {b.clientPhone}
                        </div>
                      </td>
                      <td style={{ padding: "16px" }}>
                        <div style={{ fontWeight: 500 }}>{b.serviceName}</div>
                        <div
                          style={{
                            fontSize: "0.85rem",
                            color: THEME.colors.muted,
                          }}
                        >
                          {b.masterName}
                        </div>
                      </td>
                      <td style={{ padding: "16px", fontWeight: 600 }}>
                        ${b.price}
                      </td>
                      <td style={{ padding: "16px" }}>
                        <select
                          value={b.status}
                          onChange={(e) =>
                            handleStatusChange(b.id, e.target.value)
                          }
                          style={{
                            padding: "8px",
                            borderRadius: "4px",
                            border: "1px solid #E8E0D0",
                            cursor: "pointer",
                          }}
                        >
                          <option value="IN_PROGRESS">
                            {t.admin.statusOptions.IN_PROGRESS}
                          </option>
                          <option value="CONFIRMED">
                            {t.admin.statusOptions.CONFIRMED}
                          </option>
                          <option value="COMPLETED">
                            {t.admin.statusOptions.COMPLETED}
                          </option>
                          <option value="CANCELLED">
                            {t.admin.statusOptions.CANCELLED}
                          </option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ВКЛАДКА КОРИСТУВАЧІВ */}
          {activeTab === "users" && (
            <div
              style={{
                overflowX: "auto",
                background: THEME.colors.white,
                border: "1px solid #E8E0D0",
                borderRadius: "8px",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  textAlign: "left",
                }}
              >
                <thead>
                  <tr>
                    <th style={tableHeaderStyle}>
                      {t.admin.usersColumns.name}
                    </th>
                    <th style={tableHeaderStyle}>
                      {t.admin.usersColumns.email}
                    </th>
                    <th style={tableHeaderStyle}>
                      {t.admin.usersColumns.registered}
                    </th>
                    <th style={tableHeaderStyle}>
                      {t.admin.usersColumns.role}
                    </th>
                    <th style={tableHeaderStyle}>
                      {t.admin.usersColumns.actions}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr
                      key={u.id}
                      style={{ borderBottom: "1px solid #E8E0D0" }}
                    >
                      <td style={{ padding: "16px" }}>
                        <div
                          style={{
                            fontWeight: 500,
                            color: THEME.colors.charcoal,
                          }}
                        >
                          {u.name || "Гість"}
                        </div>
                        <div
                          style={{
                            fontSize: "0.85rem",
                            color: THEME.colors.muted,
                          }}
                        >
                          {u.phone || "-"}
                        </div>
                      </td>
                      <td
                        style={{
                          padding: "16px",
                          color: THEME.colors.charcoal,
                        }}
                      >
                        {u.email || "-"}
                      </td>
                      <td
                        style={{ padding: "16px", color: THEME.colors.muted }}
                      >
                        {new Date(u.registeredAt).toLocaleDateString()}
                      </td>
                      <td style={{ padding: "16px" }}>
                        <select
                          value={u.role}
                          onChange={(e) =>
                            handleRoleChange(
                              u.id,
                              e.target.value,
                              u.masterProfileId,
                            )
                          }
                          style={{
                            padding: "8px",
                            width: "100%",
                            borderRadius: "4px",
                            border: "1px solid #E8E0D0",
                            marginBottom: u.role === "Master" ? "8px" : "0",
                            cursor: "pointer",
                          }}
                        >
                          <option value="Client">
                            {t.admin.usersColumns.client}
                          </option>
                          <option value="Master">
                            {t.admin.usersColumns.master}
                          </option>
                          <option value="Admin">
                            {t.admin.usersColumns.admin}
                          </option>
                        </select>
                        {u.role === "Master" && (
                          <select
                            value={u.masterProfileId || ""}
                            onChange={(e) =>
                              handleRoleChange(u.id, "Master", e.target.value)
                            }
                            style={{
                              padding: "8px",
                              width: "100%",
                              borderRadius: "4px",
                              border: "1px solid #C5E1A5",
                              fontSize: "0.85rem",
                            }}
                          >
                            <option value="">
                              {t.admin.dashboard.selectProfile}
                            </option>
                            {mastersList.map((m) => (
                              <option key={m.id} value={m.id}>
                                {m.name}
                              </option>
                            ))}
                          </select>
                        )}
                      </td>
                      {/* Кнопка видалення */}
                      <td style={{ padding: "16px" }}>
                        <button
                          onClick={() =>
                            handleDeleteUser(u.id, u.masterProfileId)
                          }
                          style={{
                            padding: "6px 12px",
                            background: "white",
                            color: "red",
                            border: "1px solid red",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "0.8rem",
                          }}
                        >
                          {t.admin.dashboard.buttons.deleteButtons}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ВКЛАДКА МАЙСТРІВ */}
          {activeTab === "masters" && (
            <section>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "24px",
                }}
              >
                <h3
                  style={{
                    fontFamily: THEME.fonts.display,
                    color: THEME.colors.charcoal,
                  }}
                >
                  {t.admin.tabs.masters}
                </h3>
                <button
                  onClick={() => setIsAddingMaster(!isAddingMaster)}
                  style={{
                    padding: "10px 20px",
                    background: THEME.colors.gold,
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  {isAddingMaster
                    ? t.admin.masters.closeBtn
                    : t.admin.masters.addBtn}
                </button>
              </div>
              {isAddingMaster && (
                <div
                  style={{
                    background: "#F8F5F0",
                    padding: "32px",
                    borderRadius: "8px",
                    border: "1px solid #E8E0D0",
                    marginBottom: "40px",
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "20px",
                    }}
                  >
                    <input
                      placeholder={t.admin.masters.namePh}
                      style={inputStyle}
                      onChange={(e) =>
                        setNewMaster({ ...newMaster, name: e.target.value })
                      }
                    />
                    <input
                      placeholder={t.admin.masters.phonePh}
                      style={inputStyle}
                      onChange={(e) =>
                        setNewMaster({ ...newMaster, phone: e.target.value })
                      }
                    />
                    <input
                      placeholder={t.admin.masters.mailPh}
                      style={inputStyle}
                      type="email"
                      onChange={(e) =>
                        setNewMaster({ ...newMaster, email: e.target.value })
                      }
                    />
                    <input
                      placeholder={t.admin.masters.passwPh}
                      style={inputStyle}
                      type="text"
                      onChange={(e) =>
                        setNewMaster({ ...newMaster, password: e.target.value })
                      }
                    />
                    <input
                      placeholder={t.admin.masters.expPh}
                      style={inputStyle}
                      value={newMaster.experience}
                      onChange={(e) =>
                        setNewMaster({
                          ...newMaster,
                          experience: e.target.value,
                        })
                      }
                    />

                    {/*Рівень та Спеціалізація */}
                    <select
                      style={inputStyle}
                      value={newMaster.profLevel}
                      onChange={(e) =>
                        setNewMaster({
                          ...newMaster,
                          profLevel: Number(e.target.value),
                        })
                      }
                    >
                      <option value={0}>
                        {t.admin.masters.exprank.junior}
                      </option>
                      <option value={1}>
                        {t.admin.masters.exprank.middle}
                      </option>
                      <option value={2}>
                        {t.admin.masters.exprank.senior}
                      </option>
                      <option value={3}>{t.admin.masters.exprank.top}</option>
                    </select>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                      }}
                    >
                      <label
                        style={{
                          fontSize: "0.75rem",
                          color: THEME.colors.muted,
                          textTransform: "uppercase",
                        }}
                      >
                        {t.admin.masters.specs}
                      </label>
                      <select
                        style={inputStyle}
                        value={newMaster.specialization}
                        onChange={(e) =>
                          setNewMaster({
                            ...newMaster,
                            specialization: Number(e.target.value),
                          })
                        }
                      >
                        {Object.entries(serviceTypeMap)
                          .filter(([key]) => !isNaN(Number(key)))
                          .map(([key, value]) => (
                            <option key={key} value={key}>
                              {value}
                            </option>
                          ))}
                      </select>
                    </div>

                    {/* Вибір статі */}
                    <select
                      style={inputStyle}
                      value={newMaster.gender}
                      onChange={(e) =>
                        setNewMaster({
                          ...newMaster,
                          gender: Number(e.target.value),
                        })
                      }
                    >
                      <option value={1}>{t.admin.masters.gender.woman}</option>
                      <option value={2}>{t.admin.masters.gender.man}</option>
                      <option value={0}>{t.admin.masters.gender.other}</option>
                    </select>

                    <div></div>

                    <div style={{ gridColumn: "span 2" }}>
                      <label
                        style={{
                          fontSize: "0.8rem",
                          color: THEME.colors.muted,
                          display: "block",
                          marginBottom: "8px",
                        }}
                      >
                        {t.admin.masters.photo}
                      </label>
                      <p
                        style={{
                          fontSize: "0.75rem",
                          color: THEME.colors.gold,
                          marginBottom: "10px",
                          marginTop: "-4px",
                        }}
                      >
                        {t.admin.masters.hintPhoto}
                      </p>

                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />

                      {newMaster.imageUrl && (
                        <div
                          style={{
                            marginTop: "16px",
                            border: "1px solid #E8E0D0",
                            borderRadius: "4px",
                            overflow: "hidden",
                            width: "120px",
                            height: "150px",
                            position: "relative",
                          }}
                        >
                          <button
                            onClick={() =>
                              setNewMaster((prev) => ({
                                ...prev,
                                imageUrl: "",
                              }))
                            }
                            style={{
                              position: "absolute",
                              top: "5px",
                              right: "5px",
                              background: "red",
                              color: "white",
                              border: "none",
                              borderRadius: "50%",
                              width: "20px",
                              height: "20px",
                              fontSize: "12px",
                              cursor: "pointer",
                              zIndex: 10,
                            }}
                          >
                            ✕
                          </button>
                          <img
                            src={newMaster.imageUrl}
                            alt="Preview"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      )}
                      {uploading && (
                        <p
                          style={{
                            fontSize: "0.8rem",
                            color: THEME.colors.gold,
                          }}
                        >
                          {t.admin.dashboard.status.loadingS3}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={handleSaveMaster}
                    disabled={uploading || !newMaster.imageUrl}
                    style={{
                      marginTop: "24px",
                      width: "100%",
                      padding: "14px",
                      background:
                        uploading || !newMaster.imageUrl
                          ? "#ccc"
                          : THEME.colors.charcoal,
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    {t.admin.masters.saveBtn}
                  </button>
                </div>
              )}

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                  gap: "24px",
                }}
              >
                {mastersList.map((m) => (
                  <div
                    key={m.id}
                    style={{
                      background: "white",
                      border: "1px solid #E8E0D0",
                      borderRadius: "8px",
                      overflow: "hidden",
                      textAlign: "center",
                      position: "relative",
                    }}
                  >
                    {/* КНОПКА ВИДАЛЕННЯ МАЙСТРА */}
                    <button
                      onClick={() => handleDeleteMaster(m.id)}
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        background: "rgba(211, 47, 47, 0.85)",
                        color: "white",
                        border: "none",
                        borderRadius: "50%",
                        width: "30px",
                        height: "30px",
                        cursor: "pointer",
                        zIndex: 10,
                      }}
                    >
                      ✕
                    </button>

                    <div style={{ height: "280px", background: "#eee" }}>
                      <img
                        src={
                          m.imageUrl ||
                          "https://placehold.co/300x400?text=No+Photo"
                        }
                        alt={m.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div style={{ padding: "16px" }}>
                      <h4
                        style={{
                          fontFamily: THEME.fonts.display,
                          margin: "0 0 4px",
                        }}
                      >
                        {m.name}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ВКЛАДКА ПОСЛУГ */}
          {activeTab === "services" && (
            <section>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "24px",
                }}
              >
                <h3
                  style={{
                    fontFamily: THEME.fonts.display,
                    color: THEME.colors.charcoal,
                  }}
                >
                  {t.admin.services.manageService}
                </h3>
                <button
                  onClick={() => setIsAddingService(!isAddingService)}
                  style={{
                    padding: "10px 20px",
                    background: THEME.colors.gold,
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  {isAddingService
                    ? t.admin.services.closeBtn
                    : t.admin.services.addBtn}
                </button>
              </div>
              {isAddingService && (
                <div
                  style={{
                    background: "#F8F5F0",
                    padding: "32px",
                    borderRadius: "8px",
                    border: "1px solid #E8E0D0",
                    marginBottom: "40px",
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "20px",
                    }}
                  >
                    <input
                      placeholder={t.admin.services.namePh}
                      style={inputStyle}
                      onChange={(e) =>
                        setNewService({ ...newService, title: e.target.value })
                      }
                    />
                    <input
                      placeholder={t.admin.services.durationPh}
                      type="number"
                      style={inputStyle}
                      onChange={(e) =>
                        setNewService({
                          ...newService,
                          duration: Number(e.target.value),
                        })
                      }
                    />
                    <input
                      placeholder={t.admin.services.costPh}
                      type="number"
                      style={inputStyle}
                      onChange={(e) =>
                        setNewService({
                          ...newService,
                          price: Number(e.target.value),
                        })
                      }
                    />

                    <select
                      style={inputStyle}
                      value={newService.serviceType}
                      onChange={(e) =>
                        setNewService({
                          ...newService,
                          serviceType: Number(e.target.value),
                        })
                      }
                    >
                      <option value={0}>{t.admin.services.type.option1}</option>
                      <option value={1}>{t.admin.services.type.option2}</option>
                      <option value={2}>{t.admin.services.type.option3}</option>
                      <option value={3}>{t.admin.services.type.option4}</option>
                      <option value={4}>{t.admin.services.type.option5}</option>
                      <option value={5}>{t.admin.services.type.option6}</option>
                      <option value={6}>{t.admin.services.type.option7}</option>
                    </select>

                    <textarea
                      placeholder={t.admin.services.descServicePh}
                      style={{
                        ...inputStyle,
                        gridColumn: "span 2",
                        resize: "vertical",
                        minHeight: "80px",
                        fontFamily: THEME.fonts.body,
                      }}
                      onChange={(e) =>
                        setNewService({
                          ...newService,
                          description: e.target.value,
                        })
                      }
                    />

                    <div style={{ gridColumn: "span 2" }}>
                      <label
                        style={{
                          fontSize: "0.8rem",
                          color: THEME.colors.muted,
                          display: "block",
                          marginBottom: "8px",
                        }}
                      >
                        {t.admin.services.photo}
                      </label>
                      <p
                        style={{
                          fontSize: "0.75rem",
                          color: THEME.colors.gold,
                          marginBottom: "10px",
                          marginTop: "-4px",
                        }}
                      >
                        {t.admin.services.hintPhoto}
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleServiceImageUpload}
                      />

                      {/* БЛОК ПРЕВ'Ю ДЛЯ ПОСЛУГИ */}
                      {newService.imageUrl && (
                        <div
                          style={{
                            marginTop: "16px",
                            border: "1px solid #E8E0D0",
                            borderRadius: "4px",
                            overflow: "hidden",
                            width: "200px",
                            height: "150px",
                            position: "relative",
                          }}
                        >
                          <button
                            onClick={() =>
                              setNewService((prev) => ({
                                ...prev,
                                imageUrl: "",
                              }))
                            }
                            style={{
                              position: "absolute",
                              top: "5px",
                              right: "5px",
                              background: "rgba(211, 47, 47, 0.85)",
                              color: "white",
                              border: "none",
                              borderRadius: "50%",
                              width: "24px",
                              height: "24px",
                              fontSize: "12px",
                              cursor: "pointer",
                              zIndex: 10,
                            }}
                          >
                            ✕
                          </button>
                          <img
                            src={newService.imageUrl}
                            alt="Preview"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      )}
                      {uploading && (
                        <p
                          style={{
                            fontSize: "0.8rem",
                            color: THEME.colors.gold,
                          }}
                        >
                          {t.admin.dashboard.status.loadingS3}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={handleSaveService}
                    disabled={uploading || !newService.imageUrl}
                    style={{
                      marginTop: "24px",
                      width: "100%",
                      padding: "14px",
                      background:
                        uploading || !newService.imageUrl
                          ? "#ccc"
                          : THEME.colors.charcoal,
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    {uploading
                      ? t.admin.dashboard.status.loading
                      : t.admin.services.saveBtn}
                  </button>
                </div>
              )}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                  gap: "24px",
                }}
              >
                {servicesList.map((s) => (
                  <div
                    key={s.id}
                    style={{
                      background: "white",
                      border: "1px solid #E8E0D0",
                      borderRadius: "8px",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <button
                      onClick={() => handleDeleteService(s.id)}
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        background: "rgba(211, 47, 47, 0.85)",
                        color: "white",
                        border: "none",
                        borderRadius: "50%",
                        width: "30px",
                        height: "30px",
                        cursor: "pointer",
                        zIndex: 10,
                      }}
                    >
                      ✕
                    </button>
                    <div style={{ height: "150px", background: "#eee" }}>
                      <img
                        src={
                          s.imageUrl ||
                          "https://placehold.co/400x200?text=No+Photo"
                        }
                        alt={s.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div style={{ padding: "16px" }}>
                      <h4
                        style={{
                          fontFamily: THEME.fonts.display,
                          margin: "0 0 4px",
                        }}
                      >
                        {s.title}
                      </h4>
                      <p
                        style={{
                          fontSize: "0.75rem",
                          color: THEME.colors.gold,
                        }}
                      >
                        {s.duration} {t.services.unit.min} | {s.servicePrice}{" "}
                        {t.services.unit.cost} | {s.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}

const inputStyle = {
  padding: "12px 16px",
  borderRadius: "4px",
  border: "1px solid #E8E0D0",
  fontFamily: THEME.fonts.body,
  fontSize: "1rem",
  outline: "none",
};
