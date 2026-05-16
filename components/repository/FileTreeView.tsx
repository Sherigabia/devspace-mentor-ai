import { FileNode } from "@/types/repository";
import { FolderOpen, Folder, FileText } from "lucide-react";

interface FileTreeViewProps {
  files: FileNode[];
}

function FileTreeNode({ node, depth = 0 }: { node: FileNode; depth?: number }) {
  const paddingLeft = depth * 24;

  return (
    <>
      <div
        className="flex items-center gap-2 py-1 px-2 rounded hover:bg-[#201f20] transition-colors cursor-pointer"
        style={{ paddingLeft: `${paddingLeft}px` }}
      >
        {node.type === "folder" ? (
          depth === 0 ? (
            <FolderOpen className="w-4 h-4 text-yellow-500" />
          ) : (
            <Folder className="w-4 h-4 text-yellow-500" />
          )
        ) : (
          <FileText className="w-4 h-4 text-[#908fa0]" />
        )}
        <span className="text-sm font-mono text-[#c7c4d7]">{node.name}</span>
      </div>
      {node.children?.map((child, index) => (
        <FileTreeNode key={index} node={child} depth={depth + 1} />
      ))}
    </>
  );
}

export function FileTreeView({ files }: FileTreeViewProps) {
  return (
    <div className="bg-[#161618]/70 backdrop-blur-xl border border-[#262626] rounded-xl p-6">
      <h3 className="text-2xl font-semibold text-[#e5e2e3] mb-4 flex items-center gap-2">
        <FolderOpen className="w-6 h-6" />
        Folder Map
      </h3>
      <div className="space-y-1">
        {files.map((file, index) => (
          <FileTreeNode key={index} node={file} />
        ))}
      </div>
    </div>
  );
}

// Made with Bob