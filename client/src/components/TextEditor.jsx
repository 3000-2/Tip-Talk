import React, { useCallback, useMemo, useState } from 'react';
import { Editable, withReact, useSlate, Slate } from 'slate-react';
import {
  Editor,
  Transforms,
  createEditor,
  Element as SlateElement,
} from 'slate';
import { withHistory } from 'slate-history';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAlignCenter,
  faBold,
  faCode,
  faHeading,
  faItalic,
  faList,
  faListOl,
  faQuoteRight,
  faUnderline,
} from '@fortawesome/free-solid-svg-icons';
import { Color_4 } from '../styles/common';
import Modal from './Modal';

const LIST_TYPES = ['numbered-list', 'bulleted-list'];

const EditorForm = styled.div`
  width: 100%;
  height: 500px;
  font-size: 18px;
  line-height: 21px;
  padding: 18px;
  border: 1px solid ${({ theme }) => theme.line};
  border-radius: 6px;
  background-color: ${({ theme }) => theme.bgColor};
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
  h1 {
    margin: 12px 0;
  }
`;

const Toolbar = styled.div`
  width: 100%;
  height: 42px;
  border: 1px solid ${({ theme }) => theme.line};
  border-radius: 6px;
  background-color: ${({ theme }) => theme.toolBar};
`;

const Button = styled.button`
  width: 42px;
  height: 42px;
  font-size: 20px;
  color: ${({ active, theme }) => (active ? Color_4 : theme.active)};
  border: none;
  background-color: transparent;
`;

const filter = [
  'ArrowLeft',
  'ArrowUp',
  'ArrowDown',
  'ArrowRight',
  'Backspace',
  'Delete',
];

export function deserialize(string) {
  return string.split('\n').map((line) => {
    return {
      children: [{ text: line }],
    };
  });
}

const TextEditor = () => {
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);

  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const changeContent = (data) => {
    setValue(data);
    const isAstChange = editor.operations.some(
      (op) => 'set_selection' !== op.type,
    );
    if (isAstChange) {
      // Save the value to Local Storage.
      const content = JSON.stringify(value);
      localStorage.setItem('content', content);
    }
  };

  const keyDown = (e) => {
    if (value?.length > 20) {
      const found = filter.find((key) => key === e.key);
      if (!found) {
        e.preventDefault();
        editor.deleteBackward('block');
        setIsOpen(true);
      }
    }
  };

  return (
    <>
      {editor && (
        <>
          {isOpen && (
            <Modal message="20줄을 넘길 수 없습니다!" setIsOpen={setIsOpen} />
          )}
          <Slate
            editor={editor}
            value={value}
            onChange={(data) => changeContent(data)}
          >
            <Toolbar>
              <MarkButton format="bold" icon={faBold} />
              <MarkButton format="italic" icon={faItalic} />
              <MarkButton format="underline" icon={faUnderline} />
              <MarkButton format="code" icon={faCode} />
              <BlockButton format="heading-one" icon={faHeading} />
              <BlockButton format="center" icon={faAlignCenter} />
              <BlockButton format="block-quote" icon={faQuoteRight} />
              <BlockButton format="numbered-list" icon={faListOl} />
              <BlockButton format="bulleted-list" icon={faList} />
            </Toolbar>
            <EditorForm>
              <Editable
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                placeholder="내용을 입력해주세요"
                className="Editor"
                onKeyDown={keyDown}
              />
            </EditorForm>
          </Slate>
        </>
      )}
    </>
  );
};

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>;
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>;
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>;
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>;
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>;
    case 'center':
      return <center {...attributes}>{children}</center>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const MarkButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      type="button"
      active={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <FontAwesomeIcon icon={icon} />
    </Button>
  );
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const BlockButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      active={isBlockActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <FontAwesomeIcon icon={icon} />
    </Button>
  );
};

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type),
    split: true,
  });
  const newProperties = {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  };
  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const isBlockActive = (editor, format) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Editor.nodes(editor, {
    at: Editor.unhangRange(editor, selection),
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
  });

  return !!match;
};

export default TextEditor;
