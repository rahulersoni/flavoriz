export default function UserRoleSelect({ value, onChange, error }) {
    return (
        <div>
            <label className="mb-2 block text-admin-sm font-admin-semibold text-admin-text dark:text-gray-100">Role</label>

            <select value={value} onChange={onChange} className={`admin-input ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`}>
                <option value="">Select role</option>
                <option value="admin">Admin</option>
                <option value="author">Author</option>
                <option value="subscriber">Subscriber</option>
            </select>

            {error && <p className="mt-2 text-admin-xs font-admin-medium text-red-500">{error}</p>}
        </div>
    );
}