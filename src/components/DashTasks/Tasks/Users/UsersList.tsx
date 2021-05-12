import { Events, IUser, RendererProps } from "@/interfaces";
import { adminActionBox, userItem, userNameCss } from "./Users.style";

import { AnimatedInput } from "@/components/AnimatedInput";
import { HaloIcon } from "@/components/Icons/Halo";
import { Paginate } from "@/components/Paginate/Paginate";
import { ProfileViewerWithContent } from "@/pages/ProfileViewer";
import { actionButton } from "@/styles";
import { activeActionButton } from "../Editor.styles.ts";
import { client } from "@/bridge";
import { css } from "catom";
import { inputWrapperClass } from "@/components/SignIn/inputWrapperClass";
import { listUsers } from "@/packages/halo-api/admin";
import { resourceContainer } from "../../DashTasks.style";
import { useFilteredUsers } from "./use-filtered-users";
import { useResource } from "@/hooks/use-resource";
import { useState } from "@hydrophobefireman/ui-lib";

export function UsersList({ event }: { event: Events }) {
  const {
    resp: users,
    error,
    setResp: setUsers,
  } = useResource(listUsers, [event]);

  if (error) return <div class={css({ color: "red" })}>{error}</div>;
  if (!users) return <div>Loading... </div>;
  return <UserRenderer event={event} users={users} setUsers={setUsers} />;
}

function UserRenderer({ users, setUsers }: RendererProps) {
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"all" | "dq">("all");
  const filteredUsers = useFilteredUsers(users, search, viewMode);
  const [profView, setProfView] = useState<IUser>(null);
  const me = client.getState().user;
  if (profView)
    return (
      <ProfileViewerWithContent
        close={() => setProfView(null)}
        user={profView}
        onDelete={() => {
          setUsers(users.filter((x) => x._id !== profView._id));
          setProfView(null);
        }}
        onUpdate={(newProf) => {
          const currentId = newProf._id;
          setUsers(users.map((x) => (x._id === currentId ? newProf : x)));
          setProfView(newProf);
        }}
      />
    );
  return (
    <>
      <AnimatedInput
        value={search}
        onInput={setSearch}
        labelText="Search"
        wrapperClass={inputWrapperClass}
      />
      <div class={css({ margin: "1rem", marginBottom: "0" })}>
        <button
          onClick={() => setViewMode("all")}
          class={activeActionButton}
          data-active={viewMode === "all"}
        >
          All Users
        </button>
        <button
          onClick={() => setViewMode("dq")}
          class={activeActionButton}
          data-active={viewMode === "dq"}
        >
          Disqualified Users
        </button>
      </div>
      <div class={resourceContainer}>
        <Paginate
          atOnce={100}
          items={filteredUsers}
          dualButtons={true}
          buttonClass={actionButton}
          buttonWrapperClass={css({ textAlign: "right" })}
          render={(x: IUser, i: number) => (
            <div class={userItem}>
              <div>
                <span class={userNameCss}>
                  {x.is_admin && (
                    <HaloIcon
                      size={"2rem"}
                      className={css({ transform: "translateY(.5rem)" })}
                    />
                  )}{" "}
                  {x.user}
                </span>{" "}
                ({x.name}) - ({x.points} points) {x.user === me && "(You)"}{" "}
                {x.is_disqualified && (
                  <span class={css({ color: "red" })}>(Disqualified)</span>
                )}
              </div>
              <div class={adminActionBox} data-db-actions>
                <button
                  data-index={i}
                  onClick={(e) =>
                    setProfView(filteredUsers[+e.currentTarget.dataset.index])
                  }
                  class={css({
                    transition: "0.3s",
                    textDecoration: "underline",
                    pseudo: {
                      ":focus": { color: "var(--fg)" },
                      ":hover": {
                        color: "var(--fg)",
                      },
                    },
                  })}
                >
                  Profile
                </button>
              </div>
            </div>
          )}
        />
      </div>
    </>
  );
}
