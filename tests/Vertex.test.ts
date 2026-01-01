import { Vertex } from "../src/Vertex";

describe("testing if Vertex object is correctly initialized and getters return correct values", () => {
  test("vertex stores positions correctly", () => {
    const vertex = new Vertex(0, 1, 2, 3);
    expect(vertex.getStartX()).toBe(0);
    expect(vertex.getStartY()).toBe(1);
    expect(vertex.getEndX()).toBe(2);
    expect(vertex.getEndY()).toBe(3);
  });
});
