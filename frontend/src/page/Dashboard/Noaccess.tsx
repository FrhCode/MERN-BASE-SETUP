import React from "react";

export default function Noaccess() {
  return (
    <main>
      <div className="pb-12">
        <div className="px-8 lg:px-6 sm:px-4">
          <div className="overflow-hidden bg-base-200 shadow-sm sm:rounded-lg">
            <div className="p-6">Kamu tidak punya akses kehalaman ini</div>
          </div>
        </div>
      </div>
    </main>
  );
}
