import BundledEditor from '$src/components/BundledEditor';
import React, { useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Editor } from 'tinymce';
import { defaultHtml } from './data';
import styles from './style.less';
function Doc() {
  const { id } = useParams();
  const editorRef = useRef<Editor>(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const handleEditorChange = useCallback((content: string) => {
    console.log(content);
  }, []);
  return (
    <section className={styles.container}>
      <BundledEditor
        onEditorChange={handleEditorChange}
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={defaultHtml}
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
