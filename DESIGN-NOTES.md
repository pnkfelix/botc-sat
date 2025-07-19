# ASCII Grimoire Layout Optimization - Design Notes

## Alternative Objectives for Auto Mode

**Current Implementation**: Optimizes for "visual squareness" (aspect ratio closest to 1.0 accounting for 6:10 character dimensions)

**Potential Issues with Squareness-Only Optimization**:
- May produce layouts with excessive blank space
- "Most square" output might still not look right
- Information density may be more important than geometric squareness
- Readability and usability could be sacrificed for mathematical optimization

**Alternative/Additional Objectives to Consider**:

1. **Information Density**
   - Minimize blank space / maximize content utilization
   - Prefer compact layouts that efficiently use screen real estate

2. **Readability Optimization** 
   - Ensure adequate spacing between text elements
   - Avoid cramped or overlapping content
   - Prioritize scannable, easy-to-read layouts

3. **Natural Table Feel**
   - Layouts that feel like sitting around a game table
   - Prefer traditional "around the perimeter" arrangements

4. **Content-Aware Layout**
   - Adapt to role name lengths, token counts
   - Account for actual text width variations
   - Dynamic spacing based on content density

5. **Practical Constraints**
   - Terminal window width optimization
   - Screen height limitations
   - Accessibility considerations

**Multi-Objective Approach**:
Could combine multiple scoring factors:
```
score = w1 * squareness + w2 * density + w3 * readability + w4 * content_fit
```

**Next Steps**:
- Debug text overlap bug first
- Evaluate auto mode outputs across player counts for "goodness"
- Consider implementing multi-factor scoring if squareness alone proves insufficient

---

*Note: Added 2025-07-19 during auto mode implementation review*