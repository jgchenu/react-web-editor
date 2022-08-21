import { RoutePath } from '$src/constants';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './style.less';

type ListItemProps = {
  id: string | number;
  name: string;
};

function ListItem(props: ListItemProps) {
  const { id, name } = props;
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(RoutePath.doc(id));
  }, [id, navigate]);

  return (
    <div className={styles.item} onClick={handleClick}>
      <div className={styles.name}>名称：{name}</div>
      <div className={styles.id}>id：{id}</div>
    </div>
  );
}

export default ListItem;
