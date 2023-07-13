import React, { useState } from 'react';

export const usePopoverAnchorEl = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const setAnchor = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);

  const removeAnchor = () => setAnchorEl(null);

  return { anchorEl, setAnchor, removeAnchor };
};
