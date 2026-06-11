import { useEffect, useState } from "react";
import { api, type Master, type Service } from "../../shared/api/api";
import { useI18n } from "../../shared/i18n";
import { autoCompleteBookings } from "../../shared/lib/autoCompleteBookings";
import { OrdersTab } from './tabs/OrdersTab'
import { ProductTab } from "./tabs/ProductTab";
import {
  pageStyle,
  pageTitleStyle,
  tabsRowStyle,
  getTabBtnStyle,
  loadingStyle,
  tableWrapStyle,
  tableStyle,
  thStyle,
  tdStyle,
  trStyle,
  datePrimaryStyle,
  dateSecondaryStyle,
  mutedTextStyle,
  sectionHeaderStyle,
  sectionTitleStyle,
  goldBtnStyle,
  formWrapStyle,
  formGridStyle,
  inputStyle,
  photoLabelStyle,
  photoHintStyle,
  imagePreviewWrapStyle,
  imageRemoveBtnStyle,
  getSaveBtnStyle,
  mastersGridStyle,
  masterCardStyle,
  deleteBtnStyle,
  editBtnStyle,
  masterImgWrapStyle,
  masterNameStyle,
  servicesGridStyle,
  serviceCardStyle,
  serviceImgWrapStyle,
  servicePriceStyle,
  deleteUserBtnStyle,
  selectStyle,
  masterSelectStyle,
  uploadingStyle,
  specLabelStyle,
} from "./AdminDashboard.styles";


type TabType = "bookings" | "users" | "masters" | "services" | "products" | "orders";

const EMPTY_MASTER = {
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
};
const EMPTY_SERVICE = {
  title: "",
  description: "",
  price: 0,
  duration: 60,
  serviceType: 1,
  imageUrl: "",
};

export function AdminDashboard() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<TabType>("bookings");
  const [bookings, setBookings] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [mastersList, setMastersList] = useState<Master[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [isAddingMaster, setIsAddingMaster] = useState(false);
  const [editingMasterId, setEditingMasterId] = useState<string | null>(null);
  const [newMaster, setNewMaster] = useState(EMPTY_MASTER);

  const [servicesList, setServicesList] = useState<any[]>([]);
  const [isAddingService, setIsAddingService] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [newService, setNewService] = useState(EMPTY_SERVICE);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === "bookings") {
        const res = await api.getAdminBookings();
        let bookingsArr = Array.isArray(res) ? res : (res as any).data || [];

        const completedIds = await autoCompleteBookings(bookingsArr);
        if (completedIds.length > 0) {
          bookingsArr = (bookingsArr as any[]).map((b) =>
            completedIds.includes(b.id) ? { ...b, status: "COMPLETED" } : b,
          );
        }

        setBookings(bookingsArr);
      } else if (activeTab === "users" || activeTab === "masters") {
        const [uRes, mRes] = await Promise.all([
          api.getAllUsers(),
          api.getMasters(),
        ]);
        setUsers(Array.isArray(uRes) ? uRes : (uRes as any).data || []);
        setMastersList(Array.isArray(mRes) ? mRes : (mRes as any).data || []);
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

  const handleEditMasterClick = (m: any) => {
    setNewMaster({
      name: m.name || "",
      phone: m.phone || "",
      email: m.email || "",
      password: "",
      gender: m.gender || 1,
      pricePersent: m.pricePersent || 40,
      specialization: m.specialization || 1,
      profLevel: m.profLevel || 0,
      experience: m.experience || "",
      imageUrl: m.imageUrl || "",
    });
    setEditingMasterId(m.id);
    setIsAddingMaster(true);
  };

  const closeMasterForm = () => {
    setIsAddingMaster(false);
    setEditingMasterId(null);
    setNewMaster(EMPTY_MASTER);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setNewMaster((prev) => ({ ...prev, imageUrl: URL.createObjectURL(file) }));
    setUploading(true);
    try {
      const res = await api.uploadImage(file, "masters");
      const url = (res as any).url || (res as any).data?.url;
      if (url) setNewMaster((prev) => ({ ...prev, imageUrl: url }));
    } catch {
      alert(t.admin.dashboard.imageUploadError);
      setNewMaster((prev) => ({ ...prev, imageUrl: "" }));
    } finally {
      setUploading(false);
    }
  };

  const handleSaveMaster = async () => {
    if (
      !newMaster.name ||
      !newMaster.email ||
      (!editingMasterId && !newMaster.password)
    ) {
      alert(t.admin.dashboard.errors.errorEmptySlots);
      return;
    }
    try {
      const payload: any = {
        name: newMaster.name,
        phone: newMaster.phone,
        experience: newMaster.experience,
        profLevel: Number(newMaster.profLevel),
        specialization: Number(newMaster.specialization),
        gender: Number(newMaster.gender),
        pricePersent: Number(newMaster.pricePersent),
        imageUrl: newMaster.imageUrl,
        email: newMaster.email,
      };
      if (newMaster.password) payload.password = newMaster.password;

      if (editingMasterId) {
        await (api as any).updateMaster(editingMasterId, payload);
        alert(t.admin.dashboard.success.masterIsUpdated);
      } else {
        await api.createMaster(payload);
        alert(t.admin.dashboard.success.masterIsCreated);
      }
      closeMasterForm();
      fetchData();
    } catch (error) {
      alert(t.admin.dashboard.errors.errorFailedUpload);
    }
  };

  const handleDeleteMaster = async (masterId: string) => {
    if (!window.confirm(t.admin.dashboard.confirmMessageDeleteMaster)) return;
    try {
      await api.deleteMaster(masterId);
      setMastersList((prev) => prev.filter((m) => m.id !== masterId));
    } catch {
      alert(t.admin.dashboard.errors.errorDeleteMaster);
    }
  };

  const handleEditServiceClick = (s: any) => {
    setNewService({
      title: s.title || "",
      description: s.description || "",
      price: s.servicePrice || 0,
      duration: s.duration || 60,
      serviceType: s.serviceType || 1,
      imageUrl: s.imageUrl || "",
    });
    setEditingServiceId(s.id);
    setIsAddingService(true);
  };

  const closeServiceForm = () => {
    setIsAddingService(false);
    setEditingServiceId(null);
    setNewService(EMPTY_SERVICE);
  };

  const handleServiceImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setNewService((prev) => ({ ...prev, imageUrl: URL.createObjectURL(file) }));
    setUploading(true);
    try {
      const res = await api.uploadImage(file, "services");
      const url = (res as any).url || (res as any).data?.url;
      if (url) setNewService((prev) => ({ ...prev, imageUrl: url }));
    } catch {
      alert(t.admin.dashboard.errors.errorUploadingToS3);
      setNewService((prev) => ({ ...prev, imageUrl: "" }));
    } finally {
      setUploading(false);
    }
  };

  const handleSaveService = async () => {
    if (!newService.title) {
      alert(t.admin.dashboard.errors.errorEmptyField);
      return;
    }
    try {
      const payload: any = {
        title: newService.title,
        description: newService.description || "",
        servicePrice: newService.price,
        duration: Number(newService.duration),
        serviceType: Number(newService.serviceType),
        imageUrl: newService.imageUrl,
      };

      if (editingServiceId) {
        await (api as any).updateService(editingServiceId, payload);
        alert(t.admin.dashboard.success.serviceIsUpdated);
      } else {
        await api.createService(payload as Omit<Service, "id">);
        alert(t.admin.dashboard.serviceCreated);
      }
      closeServiceForm();
      fetchData();
    } catch {
      alert(t.admin.dashboard.errors.errorSaving);
    }
  };

  const handleDeleteService = async (serviceId: string) => {
    if (!window.confirm(t.admin.dashboard.confirmMessageDeleteService)) return;
    try {
      await api.deleteService(serviceId);
      setServicesList((prev) => prev.filter((s) => s.id !== serviceId));
    } catch {
      alert(t.admin.dashboard.errors.errorDeleteService);
    }
  };

  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    try {
      await api.updateBookingStatus(bookingId, newStatus);
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b)),
      );
    } catch {
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
    } catch {
      alert(t.admin.dashboard.errors.cantUpdateRole);
    }
  };

  const handleDeleteUser = async (userId: string, masterProfileId?: string) => {
    if (!window.confirm(t.admin.dashboard.deleteCLientFromBase)) return;
    try {
      await api.deleteUser(userId);
    } catch {
      alert(t.admin.dashboard.errors.errorDelete);
      return;
    }

    if (masterProfileId) {
      try {
        await api.deleteMaster(masterProfileId);
      } catch {}
    }

    setUsers((prev) => prev.filter((u) => u.id !== userId));
    setMastersList((prev) => prev.filter((m) => m.id !== masterProfileId));
    alert(t.admin.dashboard.success.removedCompletely);
  };

  const serviceTypeOptions = [0, 1, 2, 3, 4, 5, 6].map((key) => ({
    value: key,
    label:
      t.admin.services.type[
        `option${key + 1}` as keyof typeof t.admin.services.type
      ],
  }));

  return (
    <div style={pageStyle}>
      <h2 style={pageTitleStyle}>{t.admin.title}</h2>

      <div style={tabsRowStyle}>
        {(["bookings", "users", "masters", "services", "products", "orders"] as TabType[]).map(
          (tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={getTabBtnStyle(activeTab === tab)}
            >
              {tab === "products" ? "Products" : tab === "orders" ? "Store Orders" : t.admin.tabs[tab === "services" ? "service" : tab]}
            </button>
          ),
        )}
      </div>

      {loading ? (
        <div style={loadingStyle}>{t.admin.dashboard.status.loading}</div>
      ) : (
        <>
          {/* BOOKINGS */}
          {activeTab === "bookings" && (
            <div style={tableWrapStyle}>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>{t.admin.columns.dateTime}</th>
                    <th style={thStyle}>{t.admin.columns.client}</th>
                    <th style={thStyle}>{t.admin.columns.service}</th>
                    <th style={thStyle}>{t.admin.columns.price}</th>
                    <th style={thStyle}>{t.admin.columns.notes}</th>
                    <th style={thStyle}>{t.admin.columns.status}</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b.id} style={trStyle}>
                      <td style={tdStyle}>
                        <div style={datePrimaryStyle}>{b.date}</div>
                        <div style={dateSecondaryStyle}>{b.time}</div>
                      </td>
                      <td style={tdStyle}>
                        <div style={datePrimaryStyle}>{b.clientName}</div>
                        <div style={mutedTextStyle}>{b.clientPhone}</div>
                      </td>
                      <td style={tdStyle}>
                        <div style={datePrimaryStyle}>{b.serviceName}</div>
                        <div style={mutedTextStyle}>{b.masterName}</div>
                      </td>
                      <td style={{ ...tdStyle, fontWeight: 600 }}>
                        {b.price} {t.services.unit.cost}
                      </td>

                      <td style={tdStyle}>
                        <div
                          style={{
                            fontSize: "0.85rem",
                            color: "#7A7A7A",
                            maxWidth: "150px",
                            overflowWrap: "break-word",
                          }}
                        >
                          {b.notes || "—"}
                        </div>
                      </td>

                      <td style={tdStyle}>
                        <select
                          value={b.status}
                          onChange={(e) =>
                            handleStatusChange(b.id, e.target.value)
                          }
                          style={selectStyle}
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

          {/* PRODUCTS (STORE MANAGEMENT) */}
          {activeTab === "products" && <ProductTab />}

          {/* STORE ORDERS */}
          {activeTab === "orders" && <OrdersTab />}

          {/* USERS */}
          {activeTab === "users" && (
            <div style={tableWrapStyle}>
              <table style={tableStyle}>
                <thead>
                  <tr>
                    <th style={thStyle}>{t.admin.usersColumns.name}</th>
                    <th style={thStyle}>{t.admin.usersColumns.email}</th>
                    <th style={thStyle}>{t.admin.usersColumns.registered}</th>
                    <th style={thStyle}>{t.admin.usersColumns.role}</th>
                    <th style={thStyle}>{t.admin.usersColumns.actions}</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} style={trStyle}>
                      <td style={tdStyle}>
                        <div style={datePrimaryStyle}>{u.name || "Гість"}</div>
                        <div style={mutedTextStyle}>{u.phone || "-"}</div>
                      </td>
                      <td style={tdStyle}>{u.email || "-"}</td>
                      <td style={{ ...tdStyle, color: "var(--muted)" }}>
                        {new Date(u.registeredAt).toLocaleDateString()}
                      </td>
                      <td style={tdStyle}>
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
                            ...selectStyle,
                            marginBottom: u.role === "Master" ? "8px" : "0",
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
                            style={masterSelectStyle}
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
                      <td style={tdStyle}>
                        <button
                          onClick={() =>
                            handleDeleteUser(u.id, u.masterProfileId)
                          }
                          style={deleteUserBtnStyle}
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

          {/* MASTERS */}
          {activeTab === "masters" && (
            <section>
              <div style={sectionHeaderStyle}>
                <h3 style={sectionTitleStyle}>{t.admin.tabs.masters}</h3>
                <button
                  onClick={() =>
                    isAddingMaster ? closeMasterForm() : setIsAddingMaster(true)
                  }
                  style={goldBtnStyle}
                >
                  {isAddingMaster
                    ? t.admin.masters.closeBtn
                    : t.admin.masters.addBtn}
                </button>
              </div>

              {isAddingMaster && (
                <div style={formWrapStyle}>
                  <div style={formGridStyle}>
                    <input
                      placeholder={t.admin.masters.namePh}
                      value={newMaster.name}
                      style={inputStyle}
                      onChange={(e) =>
                        setNewMaster({ ...newMaster, name: e.target.value })
                      }
                    />
                    <input
                      placeholder={t.admin.masters.phonePh}
                      value={newMaster.phone}
                      style={inputStyle}
                      onChange={(e) =>
                        setNewMaster({ ...newMaster, phone: e.target.value })
                      }
                    />
                    <input
                      placeholder={t.admin.masters.mailPh}
                      value={newMaster.email}
                      type="email"
                      style={inputStyle}
                      onChange={(e) =>
                        setNewMaster({ ...newMaster, email: e.target.value })
                      }
                    />
                    <input
                      placeholder={
                        editingMasterId
                          ? "Новий пароль (залиште порожнім, якщо не змінюєте)"
                          : t.admin.masters.passwPh
                      }
                      value={newMaster.password}
                      type="text"
                      style={inputStyle}
                      onChange={(e) =>
                        setNewMaster({ ...newMaster, password: e.target.value })
                      }
                    />
                    <input
                      placeholder={t.admin.masters.expPh}
                      value={newMaster.experience}
                      style={inputStyle}
                      onChange={(e) =>
                        setNewMaster({
                          ...newMaster,
                          experience: e.target.value,
                        })
                      }
                    />

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
                      <label style={specLabelStyle}>
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
                        {serviceTypeOptions.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    </div>

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

                    <div style={{ gridColumn: "span 2" }}>
                      <label style={photoLabelStyle}>
                        {t.admin.masters.photo}
                      </label>
                      <p style={photoHintStyle}>{t.admin.masters.hintPhoto}</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                      {newMaster.imageUrl && (
                        <div
                          style={{
                            ...imagePreviewWrapStyle,
                            width: "120px",
                            height: "150px",
                          }}
                        >
                          <button
                            onClick={() =>
                              setNewMaster((p) => ({ ...p, imageUrl: "" }))
                            }
                            style={imageRemoveBtnStyle}
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
                        <p style={uploadingStyle}>
                          {t.admin.dashboard.status.loadingS3}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={handleSaveMaster}
                    disabled={uploading}
                    style={getSaveBtnStyle(uploading)}
                  >
                    {editingMasterId
                      ? "Зберегти зміни"
                      : t.admin.masters.saveBtn}
                  </button>
                </div>
              )}

              <div style={mastersGridStyle}>
                {mastersList.map((m) => (
                  <div key={m.id} style={masterCardStyle}>
                    <button
                      onClick={() => handleEditMasterClick(m)}
                      style={editBtnStyle}
                    >
                      ✎
                    </button>
                    <button
                      onClick={() => handleDeleteMaster(m.id)}
                      style={deleteBtnStyle}
                    >
                      ✕
                    </button>
                    <div style={masterImgWrapStyle}>
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
                      <h4 style={masterNameStyle}>{m.name}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === "services" && (
            <section>
              <div style={sectionHeaderStyle}>
                <h3 style={sectionTitleStyle}>
                  {t.admin.services.manageService}
                </h3>
                <button
                  onClick={() =>
                    isAddingService
                      ? closeServiceForm()
                      : setIsAddingService(true)
                  }
                  style={goldBtnStyle}
                >
                  {isAddingService
                    ? t.admin.services.closeBtn
                    : t.admin.services.addBtn}
                </button>
              </div>

              {isAddingService && (
                <div style={formWrapStyle}>
                  <div style={formGridStyle}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                      }}
                    >
                      <label style={specLabelStyle}>
                        {t.admin.services.namePh}
                      </label>
                      <input
                        placeholder={t.admin.services.namePh}
                        value={newService.title}
                        style={inputStyle}
                        onChange={(e) =>
                          setNewService({
                            ...newService,
                            title: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                      }}
                    >
                      <label style={specLabelStyle}>
                        {t.admin.services.durationPh}
                      </label>
                      <input
                        placeholder={t.admin.services.durationPh}
                        value={newService.duration}
                        type="number"
                        style={inputStyle}
                        onChange={(e) =>
                          setNewService({
                            ...newService,
                            duration: Number(e.target.value),
                          })
                        }
                      />
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                      }}
                    >
                      <label style={specLabelStyle}>
                        {t.admin.services.costPh}
                      </label>
                      <input
                        placeholder={t.admin.services.costPh}
                        value={newService.price}
                        type="number"
                        style={inputStyle}
                        onChange={(e) =>
                          setNewService({
                            ...newService,
                            price: Number(e.target.value),
                          })
                        }
                      />
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                      }}
                    >
                      <label style={specLabelStyle}>
                        {t.admin.services.category}
                      </label>
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
                        {serviceTypeOptions.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                        gridColumn: "span 2",
                      }}
                    >
                      <label style={specLabelStyle}>
                        {t.admin.services.description}
                      </label>
                      <textarea
                        placeholder={t.admin.services.descServicePh}
                        value={newService.description}
                        style={{
                          ...inputStyle,
                          resize: "vertical",
                          minHeight: "80px",
                        }}
                        onChange={(e) =>
                          setNewService({
                            ...newService,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div style={{ gridColumn: "span 2" }}>
                      <label style={photoLabelStyle}>
                        {t.admin.services.photo}
                      </label>
                      <p style={photoHintStyle}>{t.admin.services.hintPhoto}</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleServiceImageUpload}
                      />
                      {newService.imageUrl && (
                        <div
                          style={{
                            ...imagePreviewWrapStyle,
                            width: "200px",
                            height: "150px",
                          }}
                        >
                          <button
                            onClick={() =>
                              setNewService((p) => ({ ...p, imageUrl: "" }))
                            }
                            style={imageRemoveBtnStyle}
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
                        <p style={uploadingStyle}>
                          {t.admin.dashboard.status.loadingS3}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={handleSaveService}
                    disabled={uploading}
                    style={getSaveBtnStyle(uploading)}
                  >
                    {editingServiceId
                      ? "Зберегти зміни"
                      : t.admin.services.saveBtn}
                  </button>
                </div>
              )}

              <div style={servicesGridStyle}>
                {servicesList.map((s) => (
                  <div key={s.id} style={serviceCardStyle}>
                    <button
                      onClick={() => handleEditServiceClick(s)}
                      style={editBtnStyle}
                    >
                      ✎
                    </button>
                    <button
                      onClick={() => handleDeleteService(s.id)}
                      style={deleteBtnStyle}
                    >
                      ✕
                    </button>
                    <div style={serviceImgWrapStyle}>
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
                      <h4 style={masterNameStyle}>{s.title}</h4>
                      <p style={servicePriceStyle}>
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
