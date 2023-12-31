import React from "react";

const Tag = ({ tag }: { tag: string }) => {
  return (
    <div className="px-2.5 py-1 rounded-full bg-slate-300 text-orange-400 text-sm">
      # {tag}
    </div>
  );
};

export default Tag;
