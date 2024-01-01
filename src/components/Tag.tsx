import React from "react";

const Tag = ({ tag, result }: { tag: string; result?: boolean }) => {
  return (
    <>
      {result ? (
        <div className="px-4 py-1.5 rounded-full bg-slate-300 text-orange-400 text-lg font-medium">
          # {tag}
        </div>
      ) : (
        <div className="px-2.5 py-1 rounded-full bg-slate-300 text-orange-400 text-sm">
          # {tag}
        </div>
      )}
    </>
  );
};

export default Tag;
