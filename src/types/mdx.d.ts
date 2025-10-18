declare module "*.mdx" {
  import { ComponentType } from "react";
  const MDXComponent: ComponentType<any>;
  export const frontmatter: any;
  export default MDXComponent;
}


