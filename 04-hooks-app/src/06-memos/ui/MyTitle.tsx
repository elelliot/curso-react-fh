import React from "react";

interface Props {
  title: string;
}

/* React.memo o memo (desestructurado) acepta de argumento un functional component
 */
export const MyTitle = React.memo(({ title }: Props) => {
  console.log("MyTitle Re-Render");
  return <h1 className="text-3xl">{title}</h1>;
});
