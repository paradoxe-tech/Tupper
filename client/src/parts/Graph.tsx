import React, { useEffect, useRef, useState } from "react";
import { ForceDirectedGraphChart } from "chartjs-chart-graph";
import { Contact as ContactData } from "../../../shared/types";
import { identifier } from '../../../shared/identifier';

type GraphProps = {
  contacts: ContactData[];
  setSelectedContact: Function;
}

export function ContactGraph({ contacts, setSelectedContact }:GraphProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if(!chartRef.current) return;

    const nodes = contacts
      .filter(c => c.relations.length > 0)
      .map((contact, index) => ({
        id: index,
        name: identifier(contact),
      })).filter(Boolean);

    const edges = contacts.flatMap(contact => {
      let contactNode = nodes.find(n => n.name == identifier(contact));
      if(!contactNode) return []
        
      return contact.relations.map((relation) => {
        const targetNode = nodes.find(n => n.name == relation[1]);
        if(!targetNode) return null;
        return { source: contactNode.id, target: targetNode.id };
      })
    }).filter(Boolean);

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    const graphChart = new ForceDirectedGraphChart(ctx, {
      data: {
        labels: nodes.map((node) => node.name),
        datasets: [
          {
            data: nodes,
            edges: edges as any,
            pointBackgroundColor: "steelblue"
          },
        ],
      },
      options: {
        responsive: true,
        onClick: (event, elements) => {
          if (elements.length > 0) {
            const nodeIndex = elements[0].index;
            const node = nodes[nodeIndex];
            const contact = contacts.find(c => identifier(c) == node.name) 
            if(contact) setSelectedContact(contact);
          }
        },
      },
    });

    return () => {
      graphChart.destroy();
    };
  }, [contacts]);

  return (
    <canvas ref={chartRef} width={400} height={400}></canvas>
  );
};
