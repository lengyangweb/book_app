import { createContext, useContext } from "react";

const SelectedUserContext = createContext();
const SelectedRoleContext = createContext();
const DelSelectedRoleContext = createContext();
const SetSelectedRoleContext = createContext();
const SetDelSeletedRoleContext = createContext();

// expose context hooks
export function useSelectedUser() {
  return useContext(SelectedUserContext);
}
export function useSelectedRole() {
  return useContext(SelectedRoleContext);
}
export function useDelSelectedRole() {
  return useContext(DelSelectedRoleContext);
}
export function useSetSelectedRole() {
  return useContext(SetSelectedRoleContext);
}
export function useSetDelSelectedRole() {
  return useContext(SetDelSeletedRoleContext);
}

const RoleProvider = ({
  selectedUser,
  selectedRole,
  delSelectedRole,
  setSelectedRole,
  setDelSelectedRole,
  children,
}) => {
  return (
    <SelectedUserContext.Provider value={selectedUser}>
      <SelectedRoleContext.Provider value={selectedRole}>
        <DelSelectedRoleContext.Provider value={delSelectedRole}>
          <SetSelectedRoleContext.Provider value={setSelectedRole}>
            <SetDelSeletedRoleContext.Provider value={setDelSelectedRole}>
              {children}
            </SetDelSeletedRoleContext.Provider>
          </SetSelectedRoleContext.Provider>
        </DelSelectedRoleContext.Provider>
      </SelectedRoleContext.Provider>
    </SelectedUserContext.Provider>
  );
};

export default RoleProvider;
