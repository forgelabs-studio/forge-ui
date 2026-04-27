"use client";
import { useState } from "react";
import { REGISTRY, GROUPS } from "@/lib/registry";
import { usePlaygroundStore } from "@/store/playground";

export default function Sidebar() {
  const { activeComponent, setActiveComponent } = usePlaygroundStore();
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? REGISTRY.filter(
        (c) =>
          c.displayName.toLowerCase().includes(query.toLowerCase()) ||
          c.id.includes(query.toLowerCase()),
      )
    : null;

  return (
    <div className="sidebar">
      <div className="sb-search">
        <input
          type="text"
          placeholder="Search 40 components…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="sb-list">
        {filtered
          ? filtered.map((comp) => (
              <CompItem
                key={comp.id}
                icon={comp.icon}
                name={comp.displayName.replace("FORGE", "")}
                active={activeComponent === comp.id}
                onClick={() => setActiveComponent(comp.id)}
              />
            ))
          : GROUPS.map((group) => {
              const items = REGISTRY.filter((c) => c.group === group);
              return (
                <div key={group}>
                  <div className="grp-lbl">
                    {group}
                    <span className="grp-cnt">{items.length}</span>
                  </div>
                  {items.map((comp) => (
                    <CompItem
                      key={comp.id}
                      icon={comp.icon}
                      name={comp.displayName.replace("FORGE", "")}
                      active={activeComponent === comp.id}
                      onClick={() => setActiveComponent(comp.id)}
                    />
                  ))}
                </div>
              );
            })}
      </div>
    </div>
  );
}

function CompItem({
  icon,
  name,
  active,
  onClick,
}: {
  icon: string | undefined;
  name: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <div className={`ci${active ? " active" : ""}`} onClick={onClick}>
      <div className="ci-ic">{icon}</div>
      {name}
    </div>
  );
}
