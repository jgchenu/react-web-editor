import ListItem from '$src/components/ListItem';
import React from 'react';
import { Helmet } from 'react-helmet';
import styles from './style.less';

const list = [
  {
    id: 1,
    name: 'jgchen',
  },
  {
    id: 2,
    name: 'yinjun',
  },
];

function List() {
  return (
    <section className={styles.container}>
      <Helmet>
        <title>我的文档</title>
      </Helmet>
      <div className={styles.list}>
        {list.map((item) => (
          <ListItem key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
}

export default List;
