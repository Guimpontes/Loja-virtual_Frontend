import React from 'react';
import { BiErrorAlt } from 'react-icons/bi';

export default function NotFound() {
  return (
    <div className="container">
      <div className="not-found-page">
        <h2>Página não encontrada</h2>
        <BiErrorAlt />
      </div>
    </div>
  )
}
