import React, { useState } from "react";
import { Contact as ContactData, Place } from '../../../shared/types';
import { identifier } from "../../../shared/identifier";
import { Field } from './Field';
import { Icon } from './Icon';
import { supportedSocials } from "../../../shared/socials";
import { organizationsTitles } from "../../../shared/orgaTitles";

interface ProfileProps {
  user: ContactData;
  places: Place[];
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

export const Contact: React.FC<ProfileProps> = ({ user, places }) => {
  const [activeTab, setActiveTab] = useState("info");
  const tabState = [activeTab, setActiveTab];
  
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
              {user.location.length > 0 ?
                user.location.map((placeId) => {
                  let place = places.find(p => p.id == placeId)
                  if(!place) return <></>;
                  return <Field type="place" icon="home" value={JSON.stringify(place)} />
                }) : <></>
              }
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
                  <Field type="link" 
                    icon={supportedSocials[network].icon} 
                    value={`${username};${supportedSocials[network].url.replace('$u', username)}`} />
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
              {organizationsTitles(user.job).map(title => (
                <Field type="text" icon="briefcase" value={title} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};