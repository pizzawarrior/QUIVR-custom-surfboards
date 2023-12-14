import { OrderFormStyle } from "./style";
import { Container1, Container2, Container3, Buttons } from "./style";
import Orderboard from "../../images/Orderboard.png";

export default function OrderForm({
  shaper,
  setShaper,
  surfboard_shaper,
  setModel,
  surfboard_model,
  setLength,
  surfboard_length,
  setWidth,
  surfboard_width,
  setThickness,
  surfboard_thickness,
  setConstruction,
  surfboard_construction,
  setFinSystem,
  surfboard_fin_system,
  setFinCount,
  surfboard_fin_count,
  setTailStyle,
  surfboard_tail_style,
  setGlassing,
  surfboard_glassing,
  setDesc,
  surfboard_desc,
  handleAdd,
  handleClear,
}) {
  return (
    <>
      <OrderFormStyle>
        <h1>Create a custom order</h1>
        <h3>Starting at $849</h3>
        <Container1>
          <select
            onChange={(e) => setShaper(e.target.value)}
            name="shaper"
            id="shaper"
            value={surfboard_shaper}
            required
          >
            <option>Choose a shaper...</option>
            {shaper &&
              shaper.map((obj) => {
                return (
                  <option key={obj.username} value={obj.username}>
                    {obj.username}
                  </option>
                );
              })}
          </select>
          <br />

          <input
            type="text"
            onChange={(e) => setModel(e.target.value)}
            value={surfboard_model}
            placeholder="board model..."
            required
          />
          <br />

          <input
            type="text"
            onChange={(e) => setLength(e.target.value)}
            value={surfboard_length}
            placeholder="board length..."
            required
          />
          <br />

          <input
            type="text"
            onChange={(e) => setWidth(e.target.value)}
            value={surfboard_width}
            placeholder="board width..."
            required
          />
          <br />

          <input
            type="text"
            onChange={(e) => setThickness(e.target.value)}
            value={surfboard_thickness}
            placeholder="board thickness..."
            required
          />
        </Container1>

        <Container2>
          <select
            onChange={(e) => setConstruction(e.target.value)}
            name="construction"
            id="construction"
            value={surfboard_construction}
          >
            <option> Choose a construction...</option>
            {["PU", "EPS", "XTR", "Other"].map((item) => {
              return (
                <option key={item} value={item}>
                  {item}
                </option>
              );
            })}
          </select>

          <select
            onChange={(e) => setFinSystem(e.target.value)}
            name="finSystem"
            id="finSystem"
            value={surfboard_fin_system}
          >
            <option> Choose a fin system...</option>
            {["FCS1", "FCS2", "Futures", "Other"].map((item) => {
              return (
                <option key={item} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
          <br />

          <select
            onChange={(e) => setFinCount(e.target.value)}
            name="finCount"
            id="finCount"
            value={surfboard_fin_count}
          >
            <option> Number of fins...</option>
            {[5, 4, 3, 2, 1].map((num) => {
              return (
                <option key={num} value={num}>
                  {num}
                </option>
              );
            })}
          </select>
          <br />

          <select
            onChange={(e) => setTailStyle(e.target.value)}
            name="tailStyle"
            id="tailStyle"
            value={surfboard_tail_style}
          >
            <option> Tail style...</option>
            {[
              "squash",
              "round",
              "pin",
              "diamond",
              "fish",
              "swallow",
              "asym",
            ].map((style) => {
              return (
                <option key={style} value={style}>
                  {style}
                </option>
              );
            })}
          </select>
          <br />

          <select
            onChange={(e) => setGlassing(e.target.value)}
            name="glassing"
            id="glassing"
            value={surfboard_glassing}
          >
            <option> Select glassing...</option>
            {["4 + 4 x 4", "6 + 4 x 4", "6 + 4 x 6", "6 + 6 x 6", "Other"].map(
              (glass) => {
                return (
                  <option key={glass} value={glass}>
                    {glass}
                  </option>
                );
              }
            )}
          </select>
        </Container2>
        <Container3>
          <textarea
            name="desc"
            id="desc"
            placeholder="special instructions..."
            value={surfboard_desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <br />
          <img src={Orderboard} alt="" />
          <Buttons>
            <button onClick={(e) => handleAdd(e)}>Add to cart</button>
            <br />
            <button onClick={() => handleClear()}>Clear</button>
          </Buttons>
        </Container3>
      </OrderFormStyle>
    </>
  );
}
