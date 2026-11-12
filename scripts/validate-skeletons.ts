/** SKL-1: fail the build on any skeleton that does not match the schema. */
import { readSkeletonFiles } from "../src/schema/load";
import { Skeleton } from "../src/schema/skeleton";

let bad = 0;
const files = readSkeletonFiles();
for (const { file, raw } of files) {
  const r = Skeleton.safeParse(raw);
  if (r.success) {
    if (`${r.data.id}.json` !== file) {
      bad++;
      console.error(`FAIL ${file}: id "${r.data.id}" does not match the file name`);
    }
    continue;
  }
  bad++;
  console.error(`FAIL ${file}`);
  for (const i of r.error.issues) console.error(`  ${i.path.join(".") || "(root)"}: ${i.message}`);
}
console.log(`${files.length - bad} of ${files.length} skeletons valid`);
process.exit(bad === 0 ? 0 : 1);
