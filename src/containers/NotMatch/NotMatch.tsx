import { RoutePath } from '$src/constants';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function NotMatch(): React.ReactElement {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(RoutePath.list);
  }, [navigate]);

  return null;
}

export default NotMatch;
