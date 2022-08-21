import React from 'react';
import { Helmet } from 'react-helmet';
import styles from './style.less';

function Setting() {
  return (
    <section className={styles.container}>
      <Helmet>
        <title>设置</title>
      </Helmet>
      Setting
    </section>
  );
}

export default Setting;
