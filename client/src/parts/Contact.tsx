import React, { useState } from "react";
import { Contact as ContactData } from '../../../shared/types';
import { identifier } from "../../../shared/identifier";
import { Field } from './Field';
import { Icon } from './Icon';

interface ProfileProps {
  user: ContactData;
}

function CatButton({ icon, name, tabHook }) {
  const [activeTab, setActiveTab] = tabHook;
  
  return (
    <button
      className={`py-2 px-4 ${
        activeTab === name ? "text-blue-500 font-bold" : "text-gray-500"
      }`} onClick={ () => setActiveTab(name) }>
      <Icon name={icon} />
    </button>
  );
};

export const Contact: React.FC<ProfileProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState("info");
  const tabState = [activeTab, setActiveTab]
  
  return (
    <div className="absolute abs-center max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden w-96	h-">
      <div className="bg-gray-200 h-48 flex items-center justify-center">
        <img
          className="w-24 h-24 rounded-full border-4 border-white"
          src={user.photos[0] || "https://via.placeholder.com/150"}
          alt={identifier(user)}
        />
      </div>
      <div className="p-4">
        <h2 className="text-center text-xl font-semibold text-gray-800">
          {user.civil.title} {user.civil.first} {user.civil.last} {user.civil.suffix}
        </h2>

        <div className="flex justify-around mt-4 border-b">
          <CatButton icon="book" name="info" tabHook={tabState} />
          <CatButton icon="id-card" name="contact" tabHook={tabState} />
          <CatButton icon="globe" name="socials" tabHook={tabState} />
          <CatButton icon="people" name="relations" tabHook={tabState} />
          <CatButton icon="briefcase" name="journey" tabHook={tabState} />
        </div>
        
        <div className="mt-4 h-40 pt-1 overflow-auto">
          {activeTab === "info" && (
            <div className="space-y-2">
              <Field type="date" icon="gift" value={user.birth.date} />
              <Field type="text" icon="heart" value={`${user.LGBT.gender} ${user.LGBT.trans ? 'trans' : 'cis'}genre ${user.LGBT.orientation}`} />
            </div>
          )}

          {activeTab === "relations" && (
            <div className="space-y-2">
              {user.relations.length > 0 ? (
                user.relations.map(([type, target]) => (
                  <Field type="text" icon="heart" value={target} />
                ))
              ) : (
                <p>Aucune relation enregistrée.</p>
              )}
            </div>
          )}

          {activeTab === "socials" && (
            <div className="space-y-2">
              {user.socials && user.socials.length > 0 ? (
                user.socials.map(([network, username]) => (
                  <Field type="text" icon={network} value={username} />
                ))
              ) : (
                <p>Aucun réseau enregistré.</p>
              )}
            </div>
          )}

          {activeTab === "contact" && (
            <div className="space-y-2">
              <Field type="text" icon="call" value={user.mobile} />
              <Field type="text" icon="at" value={user.email} />
            </div>
          )}

          {activeTab === "journey" && (
            <div className="space-y-2">
              <p>Les informations de parcours ne sont pas disponibles pour le moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};