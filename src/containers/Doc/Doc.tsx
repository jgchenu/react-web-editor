import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Editor } from 'tinymce';
import localforage from 'localforage';

import BundledEditor from '$src/components/BundledEditor';
import { getLocalDocId } from '$src/helpers';

import { defaultHtml } from './data';
import styles from './style.less';

const saveTime = 1000;
function Doc() {
  const { id } = useParams();
  const editorRef = useRef<Editor>(null);
  const docSaveTimerRef = useRef(null);
  const [content, setContent] = useState(defaultHtml);

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const saveContentToLocal = useCallback((key: string, str: string) => {
    docSaveTimerRef.current && window.clearTimeout(docSaveTimerRef.current);
    docSaveTimerRef.current = window.setTimeout(() => {
      localforage.setItem(key, str);
    }, saveTime);
  }, []);

  const handleEditorChange = useCallback(
    (newContent: string) => {
      setContent(newContent);
      if (!id) {
        return;
      }
      saveContentToLocal(getLocalDocId(id), newContent);
    },
    [id, saveContentToLocal],
  );

  useEffect(() => {
    if (!id) {
      return;
    }
    localforage.getItem(getLocalDocId(id)).then((res: string) => setContent(res || defaultHtml));
  }, [id]);

  return (
    <section className={styles.container}>
      <BundledEditor
        onEditorChange={handleEditorChange}
        onInit={(evt, editor) => (editorRef.current = editor)}
        value={content}
        init={{
          menubar: false,
          width: '100%',
          height: 'calc(100% - 30px)',
          toolbar_sticky: true,
          plugins: [
            'advlist',
            'anchor',
            'autolink',
            'help',
            'image',
            'link',
            'lists',
            'searchreplace',
            'table',
            'wordcount',
            'fullscreen',
          ],
          toolbar:
            'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat fullscreen | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        }}
      />
      <button onClick={log} className={styles.button}>
        Log editor content,id: {id}
      </button>
    </section>
  );
}

export default Doc;
