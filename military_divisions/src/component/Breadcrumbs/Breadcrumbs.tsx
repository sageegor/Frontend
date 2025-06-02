import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  path: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  current?: string; // Делаем необязательным
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, current }) => {
  return (
    <Breadcrumb className="custom-breadcrumb">
      {items.map((item, index) => (
        <Breadcrumb.Item 
          key={index}
          linkAs={Link}
          linkProps={{ to: item.path }}
          active={index === items.length - 1 || item.label === current}
        >
          {item.label}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default Breadcrumbs;