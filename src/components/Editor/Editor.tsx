import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import {
  $convertFromMarkdownString,
  $convertToMarkdownString,
  TRANSFORMERS,
} from "@lexical/markdown";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { EditorState, LexicalEditor } from "lexical";
import { useTranslation } from "react-i18next";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import Theme from "./Theme";

import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlugin";
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
import AutoLinkPlugin from "./plugins/AutoLinkPlugin";

import "./Editor.css";

interface EditorProp {
  initalMarkdown?: string;
  // eslint-disable-next-line no-unused-vars
  setOutputMarkdown: (markdown: string) => void;
}

const Editor = ({ initalMarkdown, setOutputMarkdown }: EditorProp) => {
  const { t } = useTranslation();

  // eslint-disable-next-line react/no-unstable-nested-components
  const Placeholder = () => {
    return (
      <div className="editor-placeholder">
        {t("enter_a_bug_report_or_improvement")}{" "}
      </div>
    );
  };

  const editorConfig = {
    namespace: "editor",
    theme: Theme,
    onError(error: any) {
      throw error;
    },
    editorState: () =>
      $convertFromMarkdownString(initalMarkdown ?? "", TRANSFORMERS),
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      AutoLinkNode,
      LinkNode,
    ],
  };

  const onChange = (_: EditorState, e: LexicalEditor) => {
    e.update(() => {
      const markdown = $convertToMarkdownString(TRANSFORMERS);
      setOutputMarkdown(markdown);
    });
  };

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        <ToolbarPlugin />
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder />}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <CodeHighlightPlugin />
          <ListPlugin />
          <LinkPlugin />
          <AutoLinkPlugin />
          <ListMaxIndentLevelPlugin maxDepth={7} />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          <OnChangePlugin onChange={onChange} />
        </div>
      </div>
    </LexicalComposer>
  );
};

export default Editor;
